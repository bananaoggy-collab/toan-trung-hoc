"use server"

import { createPost, deletePost } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addPost(formData) {
  const title = formData.get("title");
  const slug = formData.get("slug");
  const content = formData.get("content");
  const category_id = parseInt(formData.get("category_id"));
  const excerpt = formData.get("excerpt");

  await createPost({ title, slug, content, category_id, excerpt });
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function removePost(formData) {
  const id = formData.get("id");
  await deletePost(id);
  revalidatePath("/");
  revalidatePath("/admin");
}
