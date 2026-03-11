import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";

export default function Sidebar() {
  const { posts } = usePosts();
  const latestPosts = [...posts].reverse().slice(0, 5);

  const allTags = [...new Set(posts.flatMap((post) => post.tags || []))];

  return (
    <Box
      sx={{
        top: 120,
      }}
    >
      {/* Últimos artículos */}

      <Typography variant="h6" sx={{ mb: 2 }}>
        Últimos artículos
      </Typography>

      <List sx={{ p: 0, mb: 6 }}>
        {latestPosts.map((post) => (
          <ListItem key={post.id} disablePadding sx={{ mb: 2 }}>
            <ListItemButton
              component={Link}
              to={`/post/${post.id}`}
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "flex-start",
                p: 1,
                borderRadius: 1,
                transition: "all 0.2s ease",

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
                  backgroundImage: `url(${post.image})`,
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

                <Typography
                  sx={{
                    fontSize: "0.8rem",
                  }}
                >
                  {post.date}
                </Typography>
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* TAGS */}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {allTags.map((tag) => (
          <Chip
            component={Link}
            to={`/tag/${tag}`}
            clickable
            label={tag}
            size="medium"
          />
        ))}
      </Box>
    </Box>
  );
}
