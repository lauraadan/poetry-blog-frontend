import {
  Container,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { usePostsStore } from "../store/usePostsStore";
import Sidebar from "../components/layout/Sidebar";
import AvatarBio from "../components/common/AvatarBio";
import Spinner from "../components/common/Spinner";
import { useFeatureStore } from "../store/useFeatureStore";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const posts = usePostsStore((state) => state.posts);
  const features = useFeatureStore((state) => state.features);
  const loading = usePostsStore((state) => state.loading);
  const fetchPosts = usePostsStore((state) => state.fetchPosts);
  const fetchFeature = useFeatureStore((state) => state.fetchFeatures);
  const [open, setOpen] = useState(false);
  const post = posts.find((p) => p.slug === slug);
  const featurePost = features.find((p) => p.slug === slug);

  useEffect(() => {
    if (!posts.length) {
      fetchPosts();
    }
    if (!features.length) {
      fetchFeature();
    }
  }, [posts.length, fetchPosts, features.length, fetchFeature]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setOpen(true);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  if (loading) return <Spinner />;
  if (!post && !featurePost) return <Typography>Post no encontrado</Typography>;

  return (
    <>
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
              {post?.title || featurePost?.title}
            </Typography>

            <Button
              onClick={handleShare}
              startIcon={<ShareIcon />}
              sx={{
                mt: 2,
                mb: 2,
                color: "#a21717",
                textTransform: "none",
              }}
            >
              Compartir
            </Button>

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
                {post?.content || featurePost?.content}
              </Typography>
            </Box>
            <Button
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackIcon />}
              sx={{ mb: 2, mt: 4, p: 0, color: "#a21717" }}
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
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          URL copiada al portapapeles ✅
        </Alert>
      </Snackbar>
    </>
  );
}
