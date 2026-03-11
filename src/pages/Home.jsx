import { Container, Box } from "@mui/material";

import AvatarBio from "../components/common/AvatarBio";
import SearchBar from "../components/blog/SearchBar";
import PostList from "../components/blog/PostList";
import Sidebar from "../components/layout/Sidebar";

import { usePosts } from "../hooks/usePosts";

export default function Home() {
  const { posts, setSearch, loading } = usePosts();

  if (loading) {
    return <Container>Cargando posts...</Container>;
  }

  return (
    <Container maxWidth="lg">
      <AvatarBio />

      <SearchBar onSearch={setSearch} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 6,
          mt: 4,
          alignItems: "flex-start",
        }}
      >
        {/* POSTS */}

        <Box sx={{ flex: 3 }}>
          <PostList posts={posts} />
        </Box>

        {/* SIDEBAR */}

        <Box sx={{ flex: 1 }}>
          <Sidebar />
        </Box>
      </Box>
    </Container>
  );
}
