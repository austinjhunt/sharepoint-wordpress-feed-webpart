import * as React from "react";
import styles from "./WordPressRssFeed.module.scss";
import Post from "./Post";
import { IPostsLayout } from "../interfaces"; // Assuming IPost is defined
import Pagination from "./Pagination";
const PostsLayout: React.FC<IPostsLayout> = ({ posts, displaySettings, colorSettings }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = displaySettings.itemsPerPage || 5; // Default to 5 if not provided
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const paginate: (pageNumber: number) => void = (pageNumber) => setCurrentPage(pageNumber);
  React.useEffect(() => {
    setCurrentPage(1);
  }, [
    posts.length,
    posts[0]?.id,
    displaySettings.layoutType,
    displaySettings.itemsPerPage,
    displaySettings.showAuthor,
    displaySettings.showMedia,
  ]);
  return (
    <div>
      <div className={displaySettings.layoutType === "grid" ? styles.gridContainer : styles.listContainer}>
        {currentItems.map((post, index) => (
          <Post key={index} post={post} displaySettings={displaySettings} colorSettings={colorSettings} />
        ))}
      </div>
      <Pagination currentPage={currentPage} paginate={paginate} colorSettings={colorSettings} totalPages={totalPages} />
    </div>
  );
};
export default PostsLayout;
