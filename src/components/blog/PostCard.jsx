import { Card, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        mb: 3,
        overflow: "hidden",
      }}
    >
      {/* IMAGE */}
      {post.imageUrl && (
        <Box
          component="img"
          src={post.imageUrl}
          alt={post.title}
          sx={{
            width: { xs: "100%", sm: 200 },
            height: { xs: 200, sm: "auto" },
            objectFit: "cover",
          }}
        />
      )}

      {/* CONTENT */}
      <Box sx={{ p: 2 }}>
        <Typography
          component={Link}
          to={`/post/${post.slug}`}
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            fontWeight: 600,
          }}
        >
          {post.title}
        </Typography>

        <Typography sx={{ mt: 1, color: "#666" }}>{post.excerpt}</Typography>
      </Box>
    </Card>
  );
}
