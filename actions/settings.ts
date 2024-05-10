"use server";
import { getUserById } from "@/data/user";
import { CurrentUser } from "@/lib/authServer";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schema";
import * as z from "zod";

export const Settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await CurrentUser();
  if (!user) {
    return { error: "Unauthorized!" };
  }
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: "Unauthorized!" };
  }
  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });

  return {success : "Settings updated"}
};
