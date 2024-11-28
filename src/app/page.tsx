import { PostProps, AllBlogsProps } from "./types";

async function fetchBlogs() {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-cache"
  });

  const data: AllBlogsProps = await res.json();

  return data.posts;
};

export default async function Home() {
  const posts = await fetchBlogs();
  console.log(posts);

  return (
    <div>
      <p>Hello</p>
    </div>
  );
}
