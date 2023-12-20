import { UserButton,auth, currentUser} from "@clerk/nextjs";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

export default async function Home() {
  const posts = await api.post.getAll.query()
  const {  userId } = auth();
  if(!userId) return <UserButton afterSignOutUrl="/"/>

  const user = await currentUser()

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      Hello{`${user?.firstName}`}
      {userId && <UserButton afterSignOutUrl="/"/>}
      {posts.map(post=>{
        return <div key={post.id}> {post.content}</div>
      })}
    </main>
  );
}

