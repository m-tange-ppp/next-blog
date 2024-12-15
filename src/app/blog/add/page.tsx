import { redirect, useRouter } from "next/navigation";
import { postBlog } from "@/app/actions";
import { createClient } from "../../../../utils/supabase/server";

const PostBlog = async () => {
  // 認証する
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 flex flex-col justify-center items-stretch bg-blue-900 m-auto my-5 p-4 rounded-lg drop-shadow-xl">
        <p className="text-slate-200 text-2xl font-bold text-center">
          Create New Blog
        </p>
        <form action={postBlog} className="flex flex-col gap-5 my-5">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="タイトルを入力"
            className="rounded-md px-4 py-2 w-full"
          />
          <textarea
            name="description"
            id="description"
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
