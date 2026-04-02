import { Container, Typography, Box, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import usePagination from "../hooks/usePagination";
import PostCard from "../components/blog/PostCard";
import Spinner from "../components/common/Spinner";

export default function TagPage() {
  const { tag } = useParams();
  const { posts, loading } = usePosts();

  const filteredPosts = posts.filter((p) => p.tags?.includes(tag));

  const { page, totalPages, currentData, changePage } = usePagination(
    filteredPosts,
    5,
  );

  if (loading) return <Spinner />;

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Tag: {tag}
      </Typography>

      <Box>
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
