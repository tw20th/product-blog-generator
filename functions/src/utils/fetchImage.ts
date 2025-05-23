export async function fetchCoverImage(query: string): Promise<string> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
    query
  )}&client_id=${accessKey}`;

  const res = await fetch(url);
  const data = await res.json();

  return data?.urls?.regular || "";
}
