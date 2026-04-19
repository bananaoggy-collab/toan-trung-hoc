"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function adminLogin(formData) {
  const password = formData.get("password");
  const envPassword = process.env.ADMIN_PASSWORD || "admin123";
  
  if (password === envPassword) {
    const cookieStore = await cookies();
    cookieStore.set("auth-token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 // 1 day session
    });
    // Successful redirection must not be wrapped in try/catch improperly at callsite, but since we call it directly it's fine.
  } else {
    return { error: "Mật khẩu không chính xác!" };
  }
  
  // Must execute outside of the if block or without blocking
  redirect("/admin");
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  redirect("/admin/login");
}
