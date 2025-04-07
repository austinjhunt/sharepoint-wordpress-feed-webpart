import * as React from "react";
import styles from "./WordPressRssFeed.module.scss";
import Post from "./Post";
import { IPostsLayout } from "../interfaces"; // Assuming IPost is defined
const PostsLayout: React.FC<IPostsLayout> = ({ posts, displaySettings }) => {
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
          <Post key={index} post={post} displaySettings={displaySettings} />
        ))}
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={currentPage === pageNumber ? styles.activePage : ""}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};
export default PostsLayout;
