import { Box, Typography, Button, Card } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePostsStore } from "../../store/usePostsStore";

const POST_ID = "8m7kh33zszirk4o";

export default function Banner() {
  const post = usePostsStore((s) => s.posts.find((p) => p.id === POST_ID));

  const fetchPostById = usePostsStore((s) => s.fetchPostById);

  useEffect(() => {
    if (!post) {
      fetchPostById(POST_ID);
    }
  }, [post, fetchPostById]);

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
