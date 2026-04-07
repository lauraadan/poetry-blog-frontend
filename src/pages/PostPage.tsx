import { Container, Typography, Box, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePostsStore } from "../store/usePostsStore";
import Sidebar from "../components/layout/Sidebar";
import AvatarBio from "../components/common/AvatarBio";
import Spinner from "../components/common/Spinner";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const posts = usePostsStore((state) => state.posts);
  const loading = usePostsStore((state) => state.loading);
  const fetchPosts = usePostsStore((state) => state.fetchPosts);

  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!posts.length) {
      fetchPosts();
    }
  }, [posts.length, fetchPosts]);

  if (loading) return <Spinner />;
  if (!post) return <Typography>Post no encontrado</Typography>;

  return (
    <Container
      maxWidth="lg"
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <AvatarBio />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 5 },
          mt: 4,
        }}
      >
        <Box
          sx={{
            flex: 3,
            width: "100%",
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.6rem", sm: "1.9rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 2,
              wordBreak: "break-word",
              overflowWrap: "anywhere",
            }}
          >
            {post.title}
          </Typography>

          <Box
            sx={{
              maxWidth: { xs: "100%", md: 720 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.15rem" },
                lineHeight: 1.9,
                color: "#333",
                whiteSpace: "pre-line",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              {post.content}
            </Typography>
          </Box>
          <Button
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2, mt: 4, p: 0 }}
          >
            Volver
          </Button>
        </Box>

        <Box
          sx={{
            flex: 1,
            width: "100%",
            mt: { xs: 4, md: 0 },
          }}
        >
          <Sidebar />
        </Box>
      </Box>
    </Container>
  );
}
