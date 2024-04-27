"use server";
import { LoginSchema } from "@/schema";
import { signIn } from "../auth";
import * as z from "zod";
import { defaultRedirectRoute } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values);
  const validatedValues = LoginSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid Fields" };
  }
  const { email, password } = validatedValues.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: defaultRedirectRoute,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "An Error occured" };
      }
    }
    throw error;
  }
};
