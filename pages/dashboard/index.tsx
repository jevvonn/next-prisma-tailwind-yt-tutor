import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { authOptions } from "../api/auth/[...nextauth]";
import OwnPosts from "../../components/post/OwnPosts";

export default function Dashboard() {
  const { data } = useSession();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <main>
        <h1 className="font-bold text-xl">Welcome Back, {data?.user?.name}</h1>
        <OwnPosts />
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
