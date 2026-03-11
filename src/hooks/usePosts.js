import { useState, useEffect } from "react";
import { filterPosts } from "../utils/filterPosts";

const API = import.meta.env.VITE_API_URL;

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API}/api/posts?populate=*`);
        const data = await res.json();

        const formattedPosts = data.data.map((post) => ({
          id: post.id,
          ...post.attributes,
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error cargando posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = filterPosts(posts, search);

  return {
    posts: filteredPosts,
    setSearch,
  };
}
