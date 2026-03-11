const API = import.meta.env.VITE_API_URL;

export async function getPosts() {
  const res = await fetch(`${API}/api/posts?populate=image`);
  const json = await res.json();

  return json.data.map((post) => {
    const attrs = post.attributes;

    return {
      id: post.id,
      title: attrs.title,
      excerpt: attrs.excerpt,
      content: attrs.content,
      date: attrs.date,
      image: attrs.image?.data
        ? `${API}${attrs.image.data.attributes.url}`
        : null,
    };
  });
}
