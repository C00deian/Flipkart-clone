import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
 imageUrl: z
    .any()
    .refine((files) => files?.length === 1, "Category image is required")
    .refine(
      (files) => files?.[0]?.type?.startsWith("image/"),
      "Only image files are allowed"
    ),
});

// ⭐ Export the type directly from the schema
export type CategoryFormType = z.infer<typeof categorySchema>;
