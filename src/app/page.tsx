import Link from "next/link";
import { PostType, AllBlogsType } from "./types";

const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

async function fetchAllBlogs() {
  const res = await fetch(`${apiUrl}/api/blog`, {
    cache: "no-store",
  });

  const data: AllBlogsType = await res.json();

  return data.posts;
}

export default async function Home() {
  const posts = await fetchAllBlogs();

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-blue-900 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-4xl font-extrabold">
          Next Blog App
        </h1>
        <div className="flex flex-col">
          <Link
            href={"/blog/add"}
            className="text-center rounded-md p-2 m-auto my-5 bg-slate-800 text-slate-200 font-semibold text-xl hover:bg-slate-900 transition-all duration-300"
          >
            Add New Blog
          </Link>

          <div className="w-full flex flex-col justify-center items-center gap-5">
            {posts.map((post: PostType) => (
              <div key={post.id} className="w-3/4 p-4 rounded-md bg-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-2xl">{post.title}</h2>

                  <Link
                    href={`/blog/edit/${post.id}`}
                    className="px-4 py-1 text-center bg-slate-800 rounded-md font-semibold text-slate-200 hover:bg-slate-900 transition-all duration-300"
                  >
                    Edit
                  </Link>
                </div>
                <div className="mr-auto my-1">
                  <blockquote className="font-bold text-slate-700">
                    {new Date(post.createdAt).toLocaleString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </blockquote>
                </div>

                <div className="mr-auto my-1">
                  {post.createdAt !== post.updateAt && (
                    <blockquote className="font-bold text-slate-700">
                      更新日時：
                      {new Date(post.updateAt).toLocaleString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </blockquote>
                  )}
                </div>

                <div className="mr-auto my-1 whitespace-pre-line">
                  <h2>{post.description}</h2>
                </div>
              </div>
            ))}
          </div>
          <Link
            href={"/login"}
            className="text-center rounded-md p-2 m-auto mt-5 bg-slate-800 text-slate-200 font-semibold hover:bg-slate-900 transition-all duration-300"
          >
            Admin
          </Link>
        </div>
      </div>
    </main>
  );
}
