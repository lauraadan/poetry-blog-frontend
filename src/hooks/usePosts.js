import { useState, useEffect } from "react";
import { filterPosts } from "../utils/filterPosts";

const API = import.meta.env.VITE_API_URL;

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API}/api/posts?populate=image`);
        const json = await res.json();

        const formatted = json.data.map((post) => {
          const attrs = post.attributes;

          return {
            id: post.id,
            title: attrs.title,
            excerpt: attrs.excerpt,
            content: attrs.content,
            date: attrs.date,

            image: attrs.image?.data
              ? `${API}${attrs.image.data.attributes.url}`
              : null,
          };
        });

        setPosts(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = filterPosts(posts, search);

  return { posts: filteredPosts, setSearch };
}
