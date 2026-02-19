import type {
  ApiResponse,
  CurrentUser,
  LoginRequest,
  RegisterRequest,
} from "../types/User";
import { publicApi, securedApi } from "@/app/lib/ClientUrlBase";

export const signUp = async (
  data: RegisterRequest,
): Promise<ApiResponse<unknown>> => {
  const res = await publicApi.post<ApiResponse<unknown>>("/auth/register", data);

  return res.data;
};

export const login = async (data: LoginRequest): Promise<ApiResponse<unknown>> => {
  const res = await publicApi.post<ApiResponse<unknown>>("/auth/login", data);

  return res.data;
};

export const getCurrentUser = async () => {
  const res = await securedApi.get<CurrentUser>("/auth/me");
  return res.data;
};

// auth.service.ts
export const logoutUser = async () => {
  await securedApi.post("/auth/logout");
};
