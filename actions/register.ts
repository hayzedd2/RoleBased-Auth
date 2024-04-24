"use server";
import { RegisterSchema } from "@/schema";
import * as z from "zod";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values);
  const validatedValues = RegisterSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid Fields" };
  }
  return { successs: "Email sent" };
};
