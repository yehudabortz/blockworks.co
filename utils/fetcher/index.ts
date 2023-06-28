const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch from ${url} with ${res.status}`);
  }
  return res.json() as T;
};

export default fetcher;
