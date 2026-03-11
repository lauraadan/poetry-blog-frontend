import { Box, Pagination } from "@mui/material";
import PostCard from "./PostCard";

import usePagination from "../../hooks/usePagination";

export default function PostList({ posts }) {
  const { page, totalPages, currentData, changePage } = usePagination(posts, 5);

  return (
    <>
      {currentData.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {totalPages > 1 && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Pagination page={page} count={totalPages} onChange={changePage} />
        </Box>
      )}
    </>
  );
}
