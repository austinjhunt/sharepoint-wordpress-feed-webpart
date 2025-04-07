import * as React from "react";
import styles from "./WordPressRssFeed.module.scss";
import { IPagination } from "../interfaces";
import { extractDefaultColor } from "../util";

const Pagination: React.FC<IPagination> = ({ totalPages, colorSettings, paginate, currentPage }) => {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          onMouseOver={(e) => {
            e.currentTarget.style.color = extractDefaultColor(colorSettings.pageButtonHoverTextColor);
            e.currentTarget.style.backgroundColor = extractDefaultColor(colorSettings.pageButtonHoverBackgroundColor);
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = extractDefaultColor(colorSettings.pageButtonTextColor);
            e.currentTarget.style.backgroundColor = extractDefaultColor(colorSettings.pageButtonBackgroundColor);
          }}
          style={{
            backgroundColor: extractDefaultColor(colorSettings.pageButtonBackgroundColor),
            color: extractDefaultColor(colorSettings.pageButtonTextColor),
          }}
          key={pageNumber}
          onClick={() => paginate(pageNumber)}
          className={currentPage === pageNumber ? styles.activePage : ""}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
