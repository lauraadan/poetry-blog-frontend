import { create } from "zustand";
import { pb } from "../lib/pocketbase";

export const usePostsStore = create((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  search: "",

  setSearch: (value) => set({ search: value }),

  fetchPosts: async () => {
    const { posts } = get();

    if (posts.length) return;

    set({ loading: true, error: null });
    try {
      const result = await pb.collection("posts").getList(1, 100, {
        sort: "-created",
        requestKey: null,
      });
      const formatted = result.items.map((post) => ({
        ...post,
        imageUrl: post.image ? pb.files.getURL(post, post.image) : null,
      }));

      set({
        posts: formatted,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.message,
        loading: false,
      });
    }
  },
}));
