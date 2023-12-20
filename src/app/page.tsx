import { UserButton,auth, currentUser} from "@clerk/nextjs";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const {  userId } = auth();
  if(!userId) return <UserButton afterSignOutUrl="/"/>

  const user = await currentUser()
  console.log(user);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      Hello{`${user?.firstName}`}
      {userId && <UserButton afterSignOutUrl="/"/>}
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
