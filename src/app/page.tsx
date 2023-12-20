import Link from "next/link";

import { api } from "~/trpc/server";

export default async function Home() {
  const posts = await api.post.getAll.query();

  return (
    <main className="flex min-h-screen text-white ">
      {posts.map((post) => {
        return <div key={post.id}> {post.content}</div>;
      })}
    </main>
  );
}
