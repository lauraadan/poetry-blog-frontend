import { Container, Typography, Box, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import AvatarBio from "../components/common/AvatarBio";
import PostCard from "../components/blog/PostCard";
import Sidebar from "../components/layout/Sidebar";
import { usePosts } from "../hooks/usePosts";

import usePagination from "../hooks/usePagination";

export default function TagPage() {
  const { posts } = usePosts();
  const { tag } = useParams();

  const filteredPosts = posts.filter((post) => post.tags?.includes(tag));

  const { page, totalPages, currentData, changePage } = usePagination(
    filteredPosts,
    10,
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <AvatarBio />
      <Typography variant="h4" sx={{ mb: 4 }}>
        Posts con la etiqueta: {tag}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 6,
          alignItems: "flex-start",
        }}
      >
        {/* LISTADO DE POSTS */}

        <Box sx={{ flex: 3, width: "100%" }}>
          {currentData.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {totalPages > 1 && (
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Pagination
                page={page}
                count={totalPages}
                onChange={changePage}
              />
            </Box>
          )}
        </Box>

        {/* SIDEBAR */}

        <Box
          sx={{
            flex: 1,
            width: "100%",
            top: 120,
          }}
        >
          <Sidebar />
        </Box>
      </Box>
    </Container>
  );
}
