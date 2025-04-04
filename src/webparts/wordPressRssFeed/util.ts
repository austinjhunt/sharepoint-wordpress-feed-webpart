import { Post as PostProps, TagOrCategory, SiteInfo, WordPressFeedSettings } from "./interfaces";

const fetchPostsWithAndFilters: (url: string, settings: WordPressFeedSettings) => Promise<Array<PostProps>> = async (
  url,
  settings,
) => {
  try {
    let fetchUrl = `${url}/wp-json/wp/v2/posts?per_page=${settings.numPosts}`;
    if (settings.tagIds.length > 0) fetchUrl += `&tags=${settings.tagIds.join(",")}`;
    if (settings.categoryIds.length > 0) fetchUrl += `&categories=${settings.categoryIds.join(",")}`;
    if (settings.pastDays) {
      const sinceDate = new Date();
      sinceDate.setDate(sinceDate.getDate() - settings.pastDays);
      fetchUrl += `&after=${sinceDate.toISOString()}`;
    }
    const response = await fetch(fetchUrl);
    const data: PostProps[] = await response.json();
    return data.filter((post) => new RegExp(settings.postPattern, "i").test(post.title.rendered));
  } catch (error) {
    throw new Error("Error fetching posts: " + error.message);
  }
};

const fetchPostsWithOrFilters: (url: string, settings: WordPressFeedSettings) => Promise<Array<PostProps>> = async (
  url,
  settings,
) => {
  try {
    let fetchUrl = `${url}/wp-json/wp/v2/posts?per_page=${settings.numPosts}`;
    if (settings.pastDays) {
      const sinceDate = new Date();
      sinceDate.setDate(sinceDate.getDate() - settings.pastDays);
      fetchUrl += `&after=${sinceDate.toISOString()}`;
    }
    const withTags: PostProps[] = [];
    const withCategories: PostProps[] = [];
    let tagsFilterUrl = fetchUrl;
    let categoriesFilterUrl = fetchUrl;
    // get post set matching tags filter
    if (settings.tagIds.length > 0) {
      tagsFilterUrl += `&tags=${settings.tagIds.join(",")}`;
      const tagFilterResponse = await fetch(tagsFilterUrl);
      withTags.push(...(await tagFilterResponse.json()));
    }

    if (settings.categoryIds.length > 0) {
      categoriesFilterUrl += `&categories=${settings.categoryIds.join(",")}`;
      const categoryFilterResponse = await fetch(categoriesFilterUrl);
      withCategories.push(...(await categoryFilterResponse.json()));
    }

    const dedupedUnion = [...withTags, ...withCategories].reduce<PostProps[]>((accum, post) => {
      // Check if the post is already in the accumulator based on the post id
      if (!accum.some((item) => item.id === post.id)) {
        accum.push(post); // Add unique post to the accumulator
      }
      return accum;
    }, []);

    return dedupedUnion.filter((post) => new RegExp(settings.postPattern, "i").test(post.title.rendered));
  } catch (error) {
    throw new Error("Error fetching posts: " + error.message);
  }
};

const fetchPosts: (url: string, settings: WordPressFeedSettings) => Promise<Array<PostProps>> = async (
  url,
  settings,
) => {
  let posts: Array<PostProps> = [];
  if (!url || url === "") return posts;
  try {
    if (settings.filterJoinOperator === "AND") {
      posts = await fetchPostsWithAndFilters(url, settings);
    } else {
      posts = await fetchPostsWithOrFilters(url, settings);
    }
    return posts;
  } catch (e) {
    throw new Error(e.message);
  }
};

const fetchSiteInfo: (url: string) => Promise<SiteInfo | undefined> = async (url) => {
  if (!url || !url.trim()) return;
  try {
    const general = await (await fetch(`${url}/wp-json`)).json();
    const tags = await (await fetch(`${url}/wp-json/wp/v2/tags`)).json();
    const categories = await (await fetch(`${url}/wp-json/wp/v2/categories`)).json();
    return {
      tags: tags.map((tag: TagOrCategory) => ({ key: tag.id, text: tag.name })),
      categories: categories.map((category: TagOrCategory) => ({ key: category.id, text: category.name })),
      name: general.name,
      description: general.description,
    } as SiteInfo;
  } catch (error) {
    throw new Error(error.message);
  }
};

const validateUrl: (url: string) => boolean = (url) => {
  let valid = false;
  if (url && url !== "") {
    const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\.([a-z]{2,})\/?$/;
    valid = urlRegex.test(url);
  }
  return valid;
};

export { fetchPostsWithAndFilters, fetchPostsWithOrFilters, fetchPosts, validateUrl, fetchSiteInfo };
