import React, { useMemo } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import PostCard from "./PostCard";
import usePagination from "../../hooks/usePagination";
import { Post } from "../../types/Post";

interface Props {
  posts: Post[];
}

const PostList: React.FC<Props> = ({ posts }) => {
  const memoPosts = useMemo(() => posts, [posts]);

  const { page, totalPages, currentData, changePage } = usePagination<Post>(
    memoPosts,
    5,
  );

  const renderedPosts = useMemo(
    () =>
      currentData.map((post) => (
        <PostCard key={`post-${post.id}`} post={post} />
      )),
    [currentData],
  );

  if (!memoPosts.length) {
    return <Typography>No se encontraron posts.</Typography>;
  }

  return (
    <>
      {renderedPosts}

      {totalPages > 1 && (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            page={page}
            count={totalPages}
            onChange={changePage}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default PostList;
