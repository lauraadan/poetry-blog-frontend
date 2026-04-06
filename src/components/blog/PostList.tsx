import { Box, Pagination, Typography } from "@mui/material";
import PostCard from "./PostCard";
import usePagination from "../../hooks/usePagination";
import { Post } from "../../types/Post";

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  const { page, totalPages, currentData, changePage } = usePagination<Post>(
    posts,
    5,
  );

  if (!posts.length) {
    return <Typography>No se encontraron posts.</Typography>;
  }

  return (
    <>
      {currentData.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

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
}
