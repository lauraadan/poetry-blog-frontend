import { create } from "zustand";
import { pb } from "../lib/pocketbase";
import { Post } from "../types/Post";
import { PostRecord } from "../types/PostRecord";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  search: string;

  setSearch: (value: string) => void;
  fetchPosts: () => Promise<void>;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;

  if (typeof error === "string") return error;

  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message: unknown }).message);
  }

  return "Error desconocido";
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
      const result = await pb.collection("posts").getList<PostRecord>(1, 100, {
        sort: "-created",
        requestKey: null,
      });

      const formatted: Post[] = result.items.map((post) => {
        const createdFormatted = post.created
          ? new Date(post.created).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "";

        return {
          ...post,
          createdFormatted,
          imageUrl: post.image ? pb.files.getURL(post, post.image) : undefined,
        };
      });

      set({ posts: formatted, loading: false });
    } catch (err) {
      const message = getErrorMessage(err);

      set({ error: message, loading: false });
    }
  },
}));
