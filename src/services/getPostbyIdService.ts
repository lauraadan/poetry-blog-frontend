import { pb } from "../lib/pocketbase";
import { PostRecord } from "../types/PostRecord";

export async function getPostById(id: string): Promise<PostRecord> {
  const record = await pb.collection("features").getOne<PostRecord>(id);
  return record;
}
