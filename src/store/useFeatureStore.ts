import { create } from "zustand";
import { Post } from "../types/Post";
import { getFeatures } from "../services/postsService";
import { getPostById } from "../services/getPostbyIdService";
import { getErrorMessage } from "../utils/getErrorMessage";
import { mapPost } from "../mappers/postMapper";

interface FeatureState {
  features: Post[];
  loading: boolean;
  error: string | null;
  search: string;

  setSearch: (value: string) => void;
  fetchFeatures: () => Promise<void>;
  fetchPostById: (id: string) => Promise<Post | null>;
}

export const useFeatureStore = create<FeatureState>((set, get) => ({
  features: [],
  loading: false,
  error: null,
  search: "",

  setSearch: (value) => set({ search: value }),

  fetchFeatures: async () => {
    const { features } = get();

    if (features.length) return;

    set({ loading: true, error: null });

    try {
      const items = await getFeatures();
      const formatted: Post[] = items.map(mapPost);

      set({ features: formatted, loading: false });
    } catch (err) {
      const message = getErrorMessage(err);
      set({ error: message, loading: false });
    }
  },

  fetchPostById: async (id: string) => {
    const { features } = get();
    const existing = features.find((p) => p.id === id);
    if (existing) return existing;

    try {
      const data = await getPostById(id);
      const mapped = mapPost(data);

      set({ features: [...features, mapped] });

      return mapped;
    } catch (err) {
      const message = getErrorMessage(err);
      set({ error: message });
      return null;
    }
  },
}));
