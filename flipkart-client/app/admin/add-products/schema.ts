import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.coerce.number().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  // Allow strict array of objects, or any for initial state
  images: z.array(z.object({
    color: z.string(),
    colorCode: z.string(),
    imageUrl: z.any() // Use 'any' for File object, or string for URL
  })).min(1, "At least one imageUrl is required"),
  reviews: z.array(z.any()).optional(),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  price: z.coerce.number().min(0.1, "Price must be greater than 0"),
  inStock: z.boolean(),
});

// ⭐ Export the type directly from the schema
export type ProductFormType = z.infer<typeof productFormSchema>;