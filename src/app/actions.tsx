"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function postBlog(formData: FormData) {
  // フォームデータから値を取得
  const title = formData.get("title");
  const description = formData.get("description");

  // バリデーション: 必須チェック
  if (!title || typeof title !== "string") {
    throw new Error("タイトルが入力されていません");
  }

  if (!description || typeof description !== "string") {
    throw new Error("説明が入力されていません");
  }

  // APIに送信
  const res = await fetch(`${apiUrl}/api/blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  // エラーが発生した場合の処理
  if (!res.ok) {
    throw new Error("ブログ投稿中にエラーが発生しました");
  }

  // キャッシュの再検証とリダイレクト
  revalidatePath("/"); // トップページを再検証
  redirect("/"); // トップページへリダイレクト
}

async function editBlog(title: string, description: string, id: string) {
  const res = await fetch(`${apiUrl}/api/blog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, id }),
  });

  // エラーが発生した場合の処理
  if (!res.ok) {
    throw new Error("ブログ投稿中にエラーが発生しました");
  }
}

async function deleteBlog(id: string) {
  const res = await fetch(`${apiUrl}/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // エラーが発生した場合の処理
  if (!res.ok) {
    throw new Error("ブログ投稿中にエラーが発生しました");
  }
}

export async function editOrDelete(id: string, formData: FormData) {
  console.log(formData);
  const action = formData.get("action");
  const title = formData.get("title");
  const description = formData.get("description");

  if (action === "edit") {
    // バリデーション: 必須チェック
    if (!title || typeof title !== "string") {
      throw new Error("タイトルが入力されていません");
    }

    if (!description || typeof description !== "string") {
      throw new Error("説明が入力されていません");
    }
    await editBlog(title, description, id);
  } else if (action === "delete") {
    await deleteBlog(id);
  } else {
    throw new Error("不明なアクションが選択されました");
  }

  // キャッシュの再検証とリダイレクト
  revalidatePath("/"); // トップページを再検証
  redirect("/"); // トップページへリダイレクト
}
