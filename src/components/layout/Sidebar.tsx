import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { usePostsStore } from "../../store/usePostsStore";
import { Post } from "../../types/Post";

export default function Sidebar() {
  const posts = usePostsStore((state) => state.posts);

  const latestPosts = useMemo<Post[]>(() => {
    return [...posts].slice(0, 5);
  }, [posts]);

  const allTags = useMemo<string[]>(() => {
    return [...new Set(posts.flatMap((post) => post.tags || []))];
  }, [posts]);

  return (
    <Box sx={{ top: 120 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Últimas publicaciones
      </Typography>

      <List sx={{ p: 0, mb: 6 }}>
        {latestPosts.map((post) => (
          <ListItem key={post.id} disablePadding sx={{ mb: 2 }}>
            <ListItemButton
              component={Link}
              to={`/post/${post.slug}`}
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "flex-start",
                p: 1,
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#f7f7f7",
                },
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  minWidth: 60,
                  backgroundImage: post.imageUrl
                    ? `url(${post.imageUrl})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 1,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    lineHeight: 1.3,
                    mb: 0.5,
                  }}
                >
                  {post.title}
                </Typography>

                <Typography sx={{ fontSize: "0.8rem" }}>
                  {post.createdFormatted}
                </Typography>
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {allTags.map((tag) => (
          <Chip
            component={Link}
            to={`/tag/${tag}`}
            key={tag}
            clickable
            label={tag}
            size="medium"
          />
        ))}
      </Box>
    </Box>
  );
}
