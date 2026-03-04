import z from "zod";

export const updateDoctorZodSchema = z
  .object({
    name: z
      .string("Name is required")
      .min(5, "Name must be at least 5 characters")
      .max(30, "Name must be at most 30 characters"),

    profilePhoto: z.url("Invalid URL for profile photo"),

    contactNumber: z
      .string("Contact number is required")
      .min(11, "Contact number must be at least 11 characters")
      .max(14, "Contact number must be at most 14 characters"),

    address: z
      .string("Address is required")
      .min(10, "Address must be at least 10 characters")
      .max(100, "Address must be at most 100 characters"),

    experience: z
      .int("Experience must be an integer")
      .nonnegative("Experience can not be negative"),
  })
  .partial();
