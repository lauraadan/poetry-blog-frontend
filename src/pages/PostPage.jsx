import { Container, Typography, Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";

import AvatarBio from "../components/common/AvatarBio";
import Sidebar from "../components/layout/Sidebar";
import SharePost from "../components/common/SharePost";

import { usePosts } from "../hooks/usePosts";

export default function PostPage() {
  const { posts } = usePosts();
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <Container maxWidth="lg">
        <Typography>Post no encontrado</Typography>
      </Container>
    );
  }

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
          {/* BOTÓN VOLVER */}

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              mb: 3,
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
              px: 2,
              color: "#555",
              alignSelf: "flex-start",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Volver
          </Button>

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

          {/* CONTENIDO */}

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
            width: "100%",
          }}
        >
          <Sidebar />
        </Box>
      </Box>
    </Container>
  );
}
