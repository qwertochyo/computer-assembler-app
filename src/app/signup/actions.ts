"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { signupSchema } from "./schema";

const PASSWORD_SALT_ROUNDS = 10;

export type SignupState = { error?: string };

export const signupAction = async (
  _prevState: SignupState | null,
  formData: FormData
): Promise<SignupState> => {
  const result = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
    };
  }

  const { name, email, password } = result.data;

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return { error: "Email is already exist" };
  }

  const hasedPassword = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hasedPassword,
    },
  });

  redirect("/login");
};
