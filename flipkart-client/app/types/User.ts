export type RegisterRequest = {
  phoneNumber: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};


export type LoginRequest = {
  email?: string;
  phoneNumber?: string;
};

export type UserResponse = {
  id: string;
  name: string;
  email: string;
};


export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN"|"SELLER";
}
