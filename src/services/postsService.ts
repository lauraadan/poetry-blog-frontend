import { pb } from "../lib/pocketbase";
import { PostRecord } from "../types/PostRecord";

export async function getPosts(): Promise<PostRecord[]> {
  const result = await pb.collection("posts").getList<PostRecord>(1, 100, {
    sort: "-created",
    requestKey: null,
  });

  return result.items;
}
