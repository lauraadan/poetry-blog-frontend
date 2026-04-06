export interface PostRecord {
  id: string;
  title: string;
  content: string;
  slug: string;
  created: string;
  tags?: string[];
  image?: string;
}
