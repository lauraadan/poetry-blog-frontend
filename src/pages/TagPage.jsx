import { Container, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/blog/PostCard";

export default function TagPage() {
  const { tag } = useParams();
  const { posts, loading } = usePosts();

  const filteredPosts = posts.filter((p) => p.tags?.includes(tag));

  if (loading) return <p>Loading...</p>;

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Tag: {tag}
      </Typography>

      <Box>
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box>
    </Container>
  );
}
