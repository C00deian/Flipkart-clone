"use client";

import { useEffect, useState } from "react";

export function useFetch<T>(
  fetchFn: () => Promise<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFn()
      .then(setData)
      .catch((err) => {
        setError(
          err?.response?.data?.message || "Failed to fetch data"
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
