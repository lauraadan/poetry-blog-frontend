import { useEffect, useState } from "react";
import { pb } from "../lib/pocketbase";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const result = await pb.collection("posts").getFullList({
          sort: "-created",
        });

        const formatted = result.map((post) => ({
          ...post,
          date: new Date(post.created).toLocaleDateString("es-ES"),
          imageUrl: post.image ? pb.files.getURL(post, post.image) : null,
        }));

        setPosts(formatted);
      } catch (error) {
        console.error("PocketBase error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const term = search.toLowerCase();

    return (
      post.title?.toLowerCase().includes(term) ||
      post.content?.toLowerCase().includes(term) ||
      post.excerpt?.toLowerCase().includes(term) ||
      (Array.isArray(post.tags)
        ? post.tags.some((tag) => tag.toLowerCase().includes(term))
        : post.tags?.toLowerCase().includes(term))
    );
  });

  return {
    posts: filteredPosts,
    setSearch,
    loading,
  };
}
