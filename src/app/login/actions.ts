"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export type LoginState = { error?: string };

export const loginAction = async (
  _prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> => {
  const email = String(formData.get("email"));
  const password = String(formData.get("password")).trim();

  if (!email || !password) {
    return { error: "Enter email or password" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Enter email or password" };
      }
      return { error: "Auth error" };
    }
    throw error;
  }
};
