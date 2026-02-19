import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
}).refine((data) => {
    // Logic: Either Email must be valid OR Phone must be valid
    if (data.email && data.email.length > 5) return true;
    if (data.phoneNumber && data.phoneNumber.length > 9) return true;
    return false;
}, {
    message: "Please provide either a valid Email or Phone Number",
    path: ["email"], // This shows the error on the email field by default
});