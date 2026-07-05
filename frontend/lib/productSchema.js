import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Product name is required"),

  category: z.string().min(1, "Category is required"),

  description: z.string().min(10, "Description is too short"),

  price: z.coerce.number().positive(),

  quantity: z.coerce.number().positive(),

  unit: z.enum(["kg", "g", "piece", "dozen", "liter"]),

  farmingMethod: z.enum(["organic", "conventional"]),

  harvestDate: z.string(),

  origin: z.string().min(2, "Origin is required"),
});