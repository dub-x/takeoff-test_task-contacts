import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import prisma from "../src/lib/prisma";

export const getServerSideProps = async () => {
  return prisma.user.findFirst();
};

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <h1 className="text-3xl font-bold underline test">Hello world!</h1>
      {session?.user.email}
      <button onClick={() => signIn()}>sign in</button>
    </>
  );
};
// opt + shift + c - copy styles
export default Home;
