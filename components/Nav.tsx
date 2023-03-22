import { useSession } from "next-auth/react";
import Link from "next/link";
import { Logged } from "./auth/Logged";
import { Login } from "./auth/Login";

export const Nav = () => {
  const { data, status } = useSession();

  return (
    <div className="flex justify-between pb-3 items-center">
      <Link href={"/"} className="text-2xl font-bold">
        OWNstory
      </Link>
      {status == "loading"}
      <ul>
        {status == "loading" ? (
          <p>Loading...</p>
        ) : !data ? (
          <Login />
        ) : (
          <Logged image={data.user?.image || ""} />
        )}
      </ul>
    </div>
  );
};
