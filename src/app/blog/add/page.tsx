"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";

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

const PostBlog = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await postBlog(titleRef.current?.value, descriptionRef.current?.value);

    router.push("/");
    router.refresh();
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center items-stretch bg-blue-900 m-auto my-5 p-4 rounded-lg drop-shadow-xl">
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
          ></textarea>
          <button className="px-4 py-1 m-auto text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostBlog;
