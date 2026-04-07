import { Post } from "../types/Post";
import { PostRecord } from "../types/PostRecord";
import { pb } from "../lib/pocketbase";
import { formatDate } from "../utils/formatDate";

export function mapPost(post: PostRecord): Post {
  return {
    ...post,
    createdFormatted: post.created ? formatDate(post.created) : "",
    imageUrl: post.image ? pb.files.getURL(post, post.image) : undefined,
  };
}
