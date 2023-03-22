import { signIn } from "next-auth/react";

export const Login = () => {
  return (
    <li>
      <button
        className="bg-gray-700 py-2 px-6 rounded-md disabled:opacity-5 text-white"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </li>
  );
};
