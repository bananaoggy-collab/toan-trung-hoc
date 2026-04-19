"use server"

import { createComment } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitComment(data) {
  const result = await createComment(data);
  revalidatePath("/");
  // Return the newly created comment info
  return { id: result.id, ...data, created_at: new Date().toISOString() };
}
