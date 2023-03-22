import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const Logged = ({ image }: { image: string }) => {
  return (
    <li className="flex gap-8 items-center">
      <button
        className="bg-gray-700 py-2 px-6 rounded-md disabled:opacity-5 text-white"
        onClick={() => signOut()}
      >
        Sign Out
      </button>

      <Link href={"/dashboard"}>
        <Image
          src={image}
          width={50}
          height={50}
          alt=""
          className="rounded-full"
        />
      </Link>
    </li>
  );
};
