import {
  Container,
  Typography,
  Box,
  Pagination,
  TextField,
  Button,
} from "@mui/material";
import { useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePostsStore } from "../store/usePostsStore";
import usePagination from "../hooks/usePagination";
import PostCard from "../components/blog/PostCard";
import Spinner from "../components/common/Spinner";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function TagPage() {
  const { tag } = useParams();
  const navigate = useNavigate();
  const postsRef = useRef(null);
  const posts = usePostsStore((state) => state.posts);
  const loading = usePostsStore((state) => state.loading);
  const error = usePostsStore((state) => state.error);
  const search = usePostsStore((state) => state.search);
  const setSearch = usePostsStore((state) => state.setSearch);
  const filteredPosts = useMemo(() => {
    let result = posts;

    if (tag) {
      result = result.filter((p) => p.tags?.includes(tag));
    }

    if (search) {
      result = result.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return result;
  }, [posts, tag, search]);

  const { page, totalPages, currentData, changePage } = usePagination(
    filteredPosts,
    5,
    postsRef,
  );

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
      <TextField
        fullWidth
        placeholder="Buscar en esta etiqueta..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Button
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Volver
      </Button>

      <Typography variant="h4" sx={{ mb: 4 }}>
        Etiqueta: {tag}
      </Typography>

      <Box ref={postsRef} display="flex" flexDirection="column" gap={3}>
        {currentData.length === 0 ? (
          <Typography>No hay posts para esta etiqueta.</Typography>
        ) : (
          currentData.map((post) => <PostCard key={post.id} post={post} />)
        )}
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
