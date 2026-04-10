import { pb } from "../lib/pocketbase";
import { PostRecord } from "../types/PostRecord";

export async function getPosts(): Promise<PostRecord[]> {
  const result = await pb.collection("posts").getList<PostRecord>(1, 100, {
    sort: "-created",
    requestKey: null,
  });

  return result.items;
}

export async function getFeatures(): Promise<PostRecord[]> {
  const result = await pb.collection("features").getList<PostRecord>(1, 100, {
    sort: "-created",
    requestKey: null,
  });

  return result.items;
}

export async function getPostById(id: string): Promise<PostRecord> {
  const record = await pb.collection("features").getOne<PostRecord>(id);
  return record;
}
