import { UserButton, auth, currentUser } from "@clerk/nextjs";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) return <UserButton afterSignOutUrl="/" />;

  const user = await currentUser();
  return <div>
    {userId && <UserButton afterSignOutUrl="/" />}
  </div>;
};

export default Navbar;
