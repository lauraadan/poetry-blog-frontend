import { Card, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Card
      component={Link}
      to={`/post/${post.slug}`}
      sx={{
        display: "flex",
        height: 160,
        mb: 3,
        boxShadow: 0,
        borderBottom: "1px solid #eaeaea",
        borderRadius: 2,
        overflow: "hidden",
        textDecoration: "none",
        transition: "all 0.2s ease",

        "&:hover": {
          backgroundColor: "#f7f7f7",
        },
      }}
    >
      {/* Imagen */}

      <Box
        sx={{
          width: 200,
          minWidth: 200,
          height: "100%",
          backgroundImage: post.imageUrl ? `url(${post.imageUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Contenido */}

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          py: 1,
        }}
      >
        {/* Título */}

        <Typography
          className="post-title"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
            lineHeight: 1.3,
            mb: 0.5,
            transition: "color 0.2s",

            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.title}
        </Typography>

        {/* Fecha */}

        <Typography
          sx={{
            fontSize: "0.75rem",
            mb: 2,
          }}
        >
          {post.date}
        </Typography>

        {/* Extracto */}

        <Typography
          sx={{
            fontSize: "0.85rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt || post.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
