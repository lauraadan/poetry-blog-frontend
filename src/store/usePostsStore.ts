import { create } from "zustand";
import { Post } from "../types/Post";
import { getPosts, getPostById } from "../services/postsService";
import { getErrorMessage } from "../utils/getErrorMessage";
import { mapPost } from "../mappers/postMapper";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  search: string;

  setSearch: (value: string) => void;

  fetchPosts: () => Promise<void>;
}

export const usePostsStore = create<PostsState>((set, get) => ({
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
      const items = await getPosts();
      const formatted: Post[] = items.map(mapPost);

      set({ posts: formatted, loading: false });
    } catch (err) {
      const message = getErrorMessage(err);
      set({ error: message, loading: false });
    }
  },
}));
