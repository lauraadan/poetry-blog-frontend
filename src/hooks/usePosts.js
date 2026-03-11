import { useState } from "react";

import { posts } from "../constants/posts";
import { filterPosts } from "../utils/filterPosts";

export function usePosts() {
  const [search, setSearch] = useState("");

  const filteredPosts = filterPosts(posts, search);

  return {
    posts: filteredPosts,
    setSearch,
  };
}
