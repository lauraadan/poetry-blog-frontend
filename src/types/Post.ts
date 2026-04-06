export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  image?: string;
  imageUrl?: string;
  tags?: string[];
  created?: string;
  excerpt?: string;
}
