import { PostType } from "@/app/types";
import { redirect, useParams, useRouter } from "next/navigation";
import { createClient } from "../../../../../utils/supabase/server";
import { editOrDelete } from "@/app/actions";

const apiUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

const getBlogById = async (id: string) => {
  const res = await fetch(`${apiUrl}/api/blog/${id}`);
  const data = await res.json();
  return data.post;
};

const EditBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
  // 認証する
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const { id } = await params;

  const blogData: PostType = await getBlogById(id);

  const editOrDeleteWithId = editOrDelete.bind(null, id);

  return (
    <div className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 flex flex-col justify-center items-stretch bg-blue-900 m-auto my-5 p-4 rounded-lg drop-shadow-xl">
        <p className="text-slate-200 text-2xl font-bold text-center">
          Edit Blog
        </p>
        <form action={editOrDeleteWithId} className="flex flex-col gap-5 my-5">
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={blogData.title}
            placeholder="タイトルを入力"
            className="rounded-md px-4 py-2 w-full"
          />
          <textarea
            name="description"
            id="description"
            defaultValue={blogData.description}
            placeholder="記事内容を入力"
            className="rounded-md px-4 py-2 w-full"
            rows={10}
          ></textarea>{" "}
          <div className="flex justify-center gap-5">
            <button
              type="submit"
              name="action"
              value="edit"
              className="px-4 py-1  text-center text-xl bg-slate-800 rounded-md font-semibold text-slate-200 hover:bg-slate-900 transition-all duration-300"
            >
              Post
            </button>
            <button
              type="submit"
              name="action"
              value="delete"
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
