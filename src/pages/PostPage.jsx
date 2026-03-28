import { Container, Typography, Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import AvatarBio from "../components/common/AvatarBio";
import Sidebar from "../components/layout/Sidebar";
import SharePost from "../components/common/SharePost";
import Spinner from "../components/common/Spinner";
import { pb } from "../lib/pocketbase";

export default function PostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const cleanSlug = decodeURIComponent(slug).trim().toLowerCase();

        const allPosts = await pb.collection("posts").getFullList({
          requestKey: null,
        });

        console.log("URL slug:", cleanSlug);
        console.log(
          "SLUGS DB:",
          allPosts.map((p) => p.slug),
        );

        const record = allPosts.find(
          (p) => p.slug?.trim().toLowerCase() === cleanSlug,
        );

        if (!record) {
          throw new Error("Post no encontrado");
        }

        setPost({
          ...record,
          date: new Date(record.created).toLocaleDateString("es-ES"),
          imageUrl: record.image ? pb.files.getURL(record, record.image) : null,
        });
      } catch (error) {
        console.error("Post no encontrado", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return <Spinner />;
  }

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

          {/* IMAGEN */}
          {post.imageUrl && (
            <Box
              component="img"
              src={post.imageUrl}
              alt={post.title}
              sx={{
                width: "100%",
                borderRadius: 3,
                mb: 4,
              }}
            />
          )}

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
        <Box sx={{ flex: 1, width: "100%" }}>
          <Sidebar />
        </Box>
      </Box>
    </Container>
  );
}
