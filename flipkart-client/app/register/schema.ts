import { z } from "zod";

export const registerSchema = z.object({
  phoneNumber: z.string().min(2, "Number must be at least 10 digits"),

});

export type RegisterRequest = z.infer<typeof registerSchema>;


