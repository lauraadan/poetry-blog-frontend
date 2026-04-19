import React, { useMemo } from "react";
import { Card, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Post } from "../../types/Post";

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = ({ post }) => {
  const postLink = useMemo(() => `/post/${post.slug}`, [post.slug]);

  const imageElement = useMemo(() => {
    if (!post.imageUrl) return null;

    return (
      <Box
        component="img"
        src={post.imageUrl}
        alt={post.title}
        sx={{
          width: { xs: "100%", sm: 200 },
          height: { xs: 300, sm: 200 },
          objectFit: "cover",
        }}
      />
    );
  }, [post.imageUrl, post.title]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        mb: { xs: 6, sm: 4 },
        overflow: "hidden",
      }}
    >
      {imageElement}

      <Box sx={{ p: 2 }}>
        <Typography
          component={Link}
          to={postLink}
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
};

export default React.memo(PostCard);
