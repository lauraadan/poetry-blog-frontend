const API = import.meta.env.VITE_API_URL;

export const getPosts = async () => {
  const res = await fetch(`${API}/api/posts`);
  const data = await res.json();
  return data;
};
