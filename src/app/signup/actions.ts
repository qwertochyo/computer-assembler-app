"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignupState = { error?: string };

export const signupAction = async (
  _prevState: SignupState | null,
  formData: FormData
): Promise<SignupState> => {
  const name = formData.get("name") as string | undefined;
  const email = formData.get("email") as string | undefined;
  const password = formData.get("password") as string | undefined;

  if (!email) {
    return { error: "Enter email" };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: "Invalid email format" };
  }

  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    return { error: "Password must be at least 8 characters" };
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return { error: "Email is already exist" };
  }

  const hasedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hasedPassword,
    },
  });

  redirect("/login");
};
