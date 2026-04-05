import { Container, Typography, Box, Pagination } from "@mui/material";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import usePagination from "../hooks/usePagination";
import PostCard from "../components/blog/PostCard";
import Spinner from "../components/common/Spinner";
import { useMemo } from "react";

export default function TagPage() {
  const { tag } = useParams();
  const { posts, loading } = usePosts();
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => p.tags?.includes(tag));
  }, [posts, tag]);
  const postsRef = useRef(null);
  const { page, totalPages, currentData, changePage } = usePagination(
    filteredPosts,
    5,
    postsRef,
  );

  if (loading) return <Spinner />;

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Tag: {tag}
      </Typography>

      <Box ref={postsRef}>
        {currentData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={changePage}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}
