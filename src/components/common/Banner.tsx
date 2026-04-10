import { Box, Typography, Button, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pb } from "../../lib/pocketbase";
import { Post } from "../../types/Post";
import { mapPost } from "../../mappers/postMapper"; // 👈 IMPORTANTE
import { PostRecord } from "../../types/PostRecord";

export default function Banner() {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await pb
          .collection("posts")
          .getOne<PostRecord>("8m7kh33zszirk4o");

        setPost(mapPost(data));
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, []);

  if (!post) return null;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        mb: 4,
        overflow: "hidden",
      }}
    >
      {/* Imagen */}
      {post.imageUrl && (
        <Box
          component="img"
          src={post.imageUrl}
          alt={post.title}
          sx={{
            width: { xs: "100%", sm: 200 },
            height: { xs: "100%", sm: 200 },
            objectFit: "cover",
          }}
        />
      )}

      <Box
        sx={{
          p: { xs: 2, md: 3 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1,
          flex: 1,
        }}
      >
        <Typography
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontSize: { xs: "1.3rem", md: "1.8rem" },
            fontWeight: 700,
          }}
        >
          {post.title}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: "0.95rem", md: "1rem" },
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </Typography>

        <Box>
          <Button
            component={Link}
            to={`/post/${post.slug}`}
            variant="outlined"
            size="small"
            sx={{
              mt: 1,
              textTransform: "none",
              color: "#a21717",
              borderColor: "#a21717",
              "&:hover": {
                borderColor: "#e64a19",
                backgroundColor: "rgba(255,87,34,0.08)",
              },
            }}
          >
            Leer más
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
