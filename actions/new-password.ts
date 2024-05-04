"use server";
import { NewPasswordSchema, ResetSchema } from "@/schema";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken } from "@/data/passwordResetToken";
import { db } from "@/lib/db";
export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Inavlid fields" };
  }
  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Token does not exist" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });
  return { success: "Password Updated" };
};
