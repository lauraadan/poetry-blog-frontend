import { Post } from "../types/Post";

export function filterPosts(posts: Post[], query: string): Post[] {
  if (!query) return posts;

  const term = query.toLowerCase();

  return posts.filter((post) => {
    return (
      post.title?.toLowerCase().includes(term) ||
      post.content?.toLowerCase().includes(term) ||
      (Array.isArray(post.tags) &&
        post.tags.some((tag) => tag.toLowerCase().includes(term)))
    );
  });
}
