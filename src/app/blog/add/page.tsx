"use client";

import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { createClient } from "../../../../utils/supabase/client";
import Loading from "@/app/loading";

const postBlog = async (
  title: string | undefined,
  description: string | undefined
) => {
  const res = await fetch("http://localhost:3000/api/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  return res.json();
};

const authUser = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
};

const PostBlog = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    authUser().then(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postTitle = titleRef.current?.value.trim();
    const postDescription = descriptionRef.current?.value.trim();

    if (!postTitle) {
      alert("タイトルを入力してください。");
      return;
    }

    if (!postDescription) {
      alert("内容を入力してください。");
      return;
    }

    await postBlog(postTitle, postDescription);

    router.push("/");
    router.refresh();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 flex flex-col justify-center items-stretch bg-blue-900 m-auto my-5 p-4 rounded-lg drop-shadow-xl">
        <p className="text-slate-200 text-2xl font-bold text-center">
          Create New Blog
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 my-5">
          <input
            ref={titleRef}
            type="text"
            placeholder="タイトルを入力"
            className="rounded-md px-4 py-2 w-full"
          />
          <textarea
            ref={descriptionRef}
            placeholder="記事内容を入力"
            className="rounded-md px-4 py-2 w-full"
            rows={10}
          ></textarea>
          <button className="px-4 py-1 m-auto text-center text-xl bg-slate-800 rounded-md font-semibold text-slate-200 hover:bg-slate-900 transition-all duration-300">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostBlog;
