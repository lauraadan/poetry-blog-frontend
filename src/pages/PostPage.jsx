import { Container, Typography, Box, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Sidebar from "../components/layout/Sidebar";
import AvatarBio from "../components/common/AvatarBio";
import Spinner from "../components/common/Spinner";
import { pb } from "../lib/pocketbase";

export default function PostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const record = await pb
        .collection("posts")
        .getFirstListItem(`slug="${slug}"`, {
          requestKey: null,
        });

      setPost({
        ...record,
        imageUrl: record.image ? pb.files.getURL(record, record.image) : null,
      });

      setLoading(false);
    }

    fetchPost();
  }, [slug]);

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
        {/* CONTENT */}
        <Box
          sx={{
            flex: 3,
            width: "100%",
            minWidth: 0, // 🔥 evita overflow en flex
          }}
        >
          {/* BACK */}
          <Button
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
          >
            Volver
          </Button>

          {/* TITLE */}
          <Typography
            sx={{
              fontSize: { xs: "1.6rem", sm: "1.9rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 2,
              wordBreak: "break-word", // 🔥 clave
              overflowWrap: "anywhere", // 🔥 evita desbordes raros
            }}
          >
            {post.title}
          </Typography>

          {/* IMAGE */}
          {post.imageUrl && (
            <Box
              component="img"
              src={post.imageUrl}
              alt={post.title}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                mb: 3,
              }}
            />
          )}

          {/* CONTENT */}
          <Box
            sx={{
              maxWidth: { xs: "100%", md: 720 }, // 🔥 controla ancho lectura
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", sm: "1rem", md: "1.15rem" },
                lineHeight: 1.9,
                color: "#333",
                whiteSpace: "pre-line",

                // 🔥 MUY IMPORTANTE ↓↓↓
                wordBreak: "break-word",
                overflowWrap: "anywhere",
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
            mt: { xs: 4, md: 0 },
          }}
        >
          <Sidebar />
        </Box>
      </Box>
    </Container>
  );
}
