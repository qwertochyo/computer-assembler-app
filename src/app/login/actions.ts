"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { loginSchema } from "./schema";
import { redirect } from "next/navigation";

export type LoginState = { error?: string };

export const loginAction = async (
  _prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> => {
  const result = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
    };
  }

  const { email, password } = result.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Invalid email or password" };
      }
      return { error: "Something went wrong. Please try again." };
    }
    throw error;
  }

  redirect("/dashboard");
};
