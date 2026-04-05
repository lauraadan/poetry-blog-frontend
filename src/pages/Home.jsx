import {
  Container,
  Box,
  TextField,
  Pagination,
  Typography,
} from "@mui/material";
import { useRef, useMemo } from "react";

import { usePosts } from "../hooks/usePosts";
import usePagination from "../hooks/usePagination";
import PostCard from "../components/blog/PostCard";
import Sidebar from "../components/layout/Sidebar";
import AvatarBio from "../components/common/AvatarBio";
import Spinner from "../components/common/Spinner";

export default function Home() {
  const { posts, setSearch, loading } = usePosts();
  const postsRef = useRef(null);
  const memoPosts = useMemo(() => posts, [posts]);
  const { page, totalPages, currentData, changePage } = usePagination(
    memoPosts,
    5,
    postsRef,
  );

  if (loading) return <Spinner />;

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 }, mt: 4 }}>
      <AvatarBio />

      <TextField
        fullWidth
        placeholder="Buscar posts..."
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box sx={{ flex: 3 }}>
          <Box ref={postsRef} display="flex" flexDirection="column" gap={3}>
            {currentData.length === 0 ? (
              <Typography>No hay posts disponibles.</Typography>
            ) : (
              currentData.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </Box>

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
        </Box>
        <Box sx={{ flex: 1, mt: { xs: 4, md: 0 } }}>
          <Sidebar />
        </Box>
      </Box>
    </Container>
  );
}
