import { z } from "zod";
import { ProjectTag } from "@/constants/tags";


//schema to edit and delete project form
export const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  coverUrl: z.string().url("Invalid URL").or(z.literal('')).optional(),
  liveUrl: z.string().url("Invalid URL").or(z.literal('')).optional(),
  repoUrl: z.string().url("Invalid URL").or(z.literal('')).optional(),
  tag: z.enum(ProjectTag, { message: "Tag is required" }),
});


//schema for login form
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});