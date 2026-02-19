import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const axiosConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
  // Supports cookie-session auth + Spring Security CSRF (if enabled).
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    "Content-Type": "application/json",
  },
};

export const publicApi = axios.create(axiosConfig);
export const securedApi = axios.create(axiosConfig);

// Cookie-session auth: never attach Authorization headers from the browser.
const stripAuthorizationHeader = (config: any) => {
  if (!config?.headers) return config;

  // Axios can use plain objects or AxiosHeaders; handle both safely.
  try {
    if (typeof config.headers.delete === "function") {
      config.headers.delete("Authorization");
      config.headers.delete("authorization");
    }
  } catch {
    // ignore
  }

  try {
    delete config.headers.Authorization;
    delete config.headers.authorization;
  } catch {
    // ignore
  }

  return config;
};

publicApi.interceptors.request.use(stripAuthorizationHeader);
securedApi.interceptors.request.use(stripAuthorizationHeader);

// 🟥 Response Interceptor: Handle 401/403 Errors for protected APIs
securedApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    // Don't hard-redirect when we're only probing session state.
    if (status === 401 && error.config?.url?.includes("/auth/me")) {
      return Promise.reject(error);
    }

    if (typeof window !== "undefined") {
      if (status === 401) {
        console.warn("Unauthorized (401). Session missing/expired.");
        window.location.href = "/login";
      }

      if (status === 403) {
        console.warn("Forbidden (403). Not allowed for this account.");
        window.location.href = "/forbidden";
      }
    }

    return Promise.reject(error);
  }
);
