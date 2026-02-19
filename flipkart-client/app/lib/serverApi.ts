import "server-only";

import axios from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const buildCookieHeader = async () => {
  // Next.js 16+ can expose cookies() as async.
  const store = await cookies();
  const all = store.getAll();
  if (!all.length) return "";
  return all.map((c: { name: string; value: string }) => `${c.name}=${c.value}`).join("; ");
};

export const createServerApi = async () => {
  const cookieHeader = await buildCookieHeader();

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  });
};
