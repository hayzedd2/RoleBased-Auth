"use server";
import { RegisterSchema } from "@/schema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationToken } from "@/lib/mail";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values);
  const validatedValues = RegisterSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid Fields" };
  }
  const { email, password, name } = validatedValues.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in use!" };
  }
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  const verificationToken = await generateVerificationToken(email);
  console.log({
    token: verificationToken.token,
    email: verificationToken.email,
  });
  await sendVerificationToken(verificationToken.email, verificationToken.token);
  return { successs: "Confirmation email sent!" };
};
