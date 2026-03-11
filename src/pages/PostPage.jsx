import { Container, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import AvatarBio from "../components/common/AvatarBio";
import Sidebar from "../components/layout/Sidebar";

import SharePost from "../components/common/SharePost";

import { usePosts } from "../hooks/usePosts";

export default function PostPage() {
  const { posts } = usePosts();
  const { id } = useParams();

  const post = posts.find((p) => p.id === id);

  if (!post) return <Container>Post no encontrado</Container>;

  return (
    <Container maxWidth="lg">
      <AvatarBio />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          mb: 10,
          my: 10,
          gap: 6,
          alignItems: "flex-start",
        }}
      >
        {/* CONTENIDO */}

        <Box sx={{ flex: 3 }}>
          {/* HEADER */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              {post.title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: "#666",
              }}
            >
              <Typography variant="body2">{post.date}</Typography>

              <SharePost />
            </Box>
          </Box>

          <Box sx={{ maxWidth: 720 }}>
            <Typography
              sx={{
                fontSize: "1.15rem",
                lineHeight: 2,
                color: "#333",
                whiteSpace: "pre-line",
              }}
            >
              {post.content}
            </Typography>
          </Box>
        </Box>

        {/* SIDEBAR */}

        <Box
          sx={{
            flex: 1,
            top: 120,
          }}
        >
          <Sidebar />
        </Box>
      </Box>
    </Container>
  );
}
