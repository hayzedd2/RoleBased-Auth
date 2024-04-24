"use server";
import { LoginSchema } from "@/schema";
import * as z from "zod";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values);
  const validatedValues = LoginSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid Fields" };
  }
  return { successs: "Email sent" };
};
