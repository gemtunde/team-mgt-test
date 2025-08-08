import { z } from "zod";

export const teamSchema = z.object({
  name: z
    .string()
    .min(1, "Team name is required")
    .min(2, "Team name must be at least 2 characters")
    .max(100, "Team name must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Team name contains invalid characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),

  code: z
    .string()
    .min(1, "Team code is required")
    .min(2, "Team code must be at least 2 characters")
    .max(10, "Team code must be less than 10 characters")
    .regex(
      /^[A-Z0-9]+$/,
      "Team code must be uppercase letters and numbers only"
    ),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),

  entity: z
    .string()
    .min(1, "Entity is required")
    .min(2, "Entity must be at least 2 characters")
    .max(100, "Entity must be less than 100 characters"),

  manager: z
    .string()
    .min(1, "Manager is required")
    .min(2, "Manager name must be at least 2 characters")
    .max(100, "Manager name must be less than 100 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "Manager name contains invalid characters"),

  status: z.enum(["Active", "Inactive"], {
    required_error: "Status is required",
    invalid_type_error: "Status must be either Active or Inactive",
  }),
});

export const updateTeamSchema = teamSchema.extend({
  id: z.string().min(1, "Team ID is required"),
});

export type TeamFormData = z.infer<typeof teamSchema>;
export type UpdateTeamFormData = z.infer<typeof updateTeamSchema>;
