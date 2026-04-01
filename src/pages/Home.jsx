import { Container, Box, TextField, Pagination } from "@mui/material";

import { usePosts } from "../hooks/usePosts";
import usePagination from "../hooks/usePagination";
import PostCard from "../components/blog/PostCard";
import Sidebar from "../components/layout/Sidebar";
import AvatarBio from "../components/common/AvatarBio";
import Spinner from "../components/common/Spinner";

export default function Home() {
  const { posts, setSearch, loading } = usePosts();

  const { page, totalPages, currentData, changePage } = usePagination(posts, 5);

  if (loading) return <Spinner />;

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 }, mt: 4 }}>
      <AvatarBio />

      {/* SEARCH */}
      <TextField
        fullWidth
        placeholder="Buscar posts..."
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 4,
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* POSTS */}
        <Box sx={{ flex: 3 }}>
          {currentData.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {/* PAGINATION */}
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
              />
            </Box>
          )}
        </Box>

        {/* SIDEBAR */}
        <Box sx={{ flex: 1, mt: { xs: 4, md: 0 } }}>
          <Sidebar />
        </Box>
      </Box>
    </Container>
  );
}
