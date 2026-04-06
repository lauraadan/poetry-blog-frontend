import {
  Container,
  Box,
  TextField,
  Pagination,
  Typography,
} from "@mui/material";
import { useRef, useEffect, useMemo } from "react";
import { usePostsStore } from "../store/usePostsStore";
import usePagination from "../hooks/usePagination";
import PostCard from "../components/blog/PostCard";
import Sidebar from "../components/layout/Sidebar";
import AvatarBio from "../components/common/AvatarBio";
import Spinner from "../components/common/Spinner";
import { Post } from "../types/Post";

export default function Home() {
  const postsRef = useRef<HTMLDivElement | null>(null);

  const posts = usePostsStore((state) => state.posts);
  const loading = usePostsStore((state) => state.loading);
  const error = usePostsStore((state) => state.error);
  const fetchPosts = usePostsStore((state) => state.fetchPosts);
  const search = usePostsStore((state) => state.search);
  const setSearch = usePostsStore((state) => state.setSearch);

  const filteredPosts = useMemo<Post[]>(() => {
    if (!search) return posts;

    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [posts, search]);

  const { page, totalPages, currentData, changePage } = usePagination(
    filteredPosts,
    5,
    postsRef,
  );

  useEffect(() => {
    if (!posts.length) fetchPosts();
  }, [posts.length, fetchPosts]);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <AvatarBio />

      <TextField
        fullWidth
        placeholder="Buscar posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Box display="flex" gap={4}>
        <Box flex={3}>
          <Box ref={postsRef} display="flex" flexDirection="column" gap={3}>
            {currentData.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Box>

          <Pagination page={page} count={totalPages} onChange={changePage} />
        </Box>

        <Box flex={1}>
          <Sidebar />
        </Box>
      </Box>
    </Container>
  );
}
