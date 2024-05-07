"use server";
import { LoginSchema } from "@/schema";
import { signIn } from "../auth";
import * as z from "zod";
import { defaultRedirectRoute } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { sendTwoFactorToken, sendVerificationToken } from "@/lib/mail";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation";
import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedValues = LoginSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid Fields" };
  }
  const { email, password, code } = validatedValues.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email or password do not match" };
  }
  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  console.log(passwordMatch);
  if (!passwordMatch) {
    return { error: "Invalid Credentials" };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationToken(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent" };
  }
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return { error: "Inavlid token" };
      }
      if (twoFactorToken.token !== code) {
        return { error: "Invalid code" };
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code has expired" };
      }
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }
      await db.twoFactorConfirmation.create({
        data:{
          userId : existingUser.id
        }
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorToken(twoFactorToken.email, twoFactorToken.token);
      console.log({ elseValues: values });
      return { twofactor: true };
    }
  }
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
