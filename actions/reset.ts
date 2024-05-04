"use server";
import { ResetSchema } from "@/schema";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import {
  generatePasswordResetToken,
} from "@/lib/tokens";
import { sendPasswordResetToken} from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Email!" };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email not found" };
  }
  //   send email token
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetToken(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "Reset email sent" };
};
