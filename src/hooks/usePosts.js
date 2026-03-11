import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        const formatted = data.map((post) => ({
          ...post,
          date: new Date(post.created_at).toLocaleDateString("es-ES"),
        }));

        setPosts(formatted);
      }

      setLoading(false);
    }

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const term = search.toLowerCase();

    return (
      post.title?.toLowerCase().includes(term) ||
      post.content?.toLowerCase().includes(term) ||
      post.excerpt?.toLowerCase().includes(term) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(term))
    );
  });

  return {
    posts: filteredPosts,
    setSearch,
    loading,
  };
}
