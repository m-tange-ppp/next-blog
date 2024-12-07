"use client";

import Loading from "@/app/loading";
import { PostType } from "@/app/types";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { createClient } from "../../../../../utils/supabase/client";

const editBlog = async (
  title: string | undefined,
  description: string | undefined,
  id: string
) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, id }),
  });

  return res.json();
};

const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  return data.post;
};

const deleteBlog = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
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

const EditBlog = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<{
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    authUser().then(() =>
      getBlogById(id)
        .then((data: PostType) => {
          setPost({ title: data.title, description: data.description });
          setIsLoading(false);
        })
        .catch((err) => console.error(err))
    );
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

    await editBlog(postTitle, postDescription, id);

    router.push("/");
    router.refresh();
  };

  const handleDelete = async (e: React.FormEvent) => {
    await deleteBlog(id);

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
          Edit Blog
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 my-5">
          <input
            ref={titleRef}
            type="text"
            placeholder="タイトルを入力"
            defaultValue={post?.title}
            className="rounded-md px-4 py-2 w-full"
          />
          <textarea
            ref={descriptionRef}
            placeholder="記事内容を入力"
            defaultValue={post?.description}
            className="rounded-md px-4 py-2 w-full"
            rows={10}
          ></textarea>
          <div className="flex justify-center gap-5">
            <button
              type="submit"
              className="px-4 py-1  text-center text-xl bg-slate-800 rounded-md font-semibold text-slate-200 hover:bg-slate-900 transition-all duration-300"
            >
              Post
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-1  text-center text-xl bg-red-600 rounded-md font-semibold text-slate-200 hover:bg-red-700 transition-all duration-300"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
