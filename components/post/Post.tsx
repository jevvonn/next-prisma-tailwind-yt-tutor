import { PostType } from "@/types/Post";
import Image from "next/image";
import Link from "next/link";

export const Post = ({
  user: { image, name },
  title,
  id,
  comments,
}: PostType) => {
  return (
    <div className="bg-white w-full p-6 mt-4 rounded-lg">
      <div className="flex gap-2 items-center">
        <Image
          src={image}
          width={32}
          height={32}
          alt=""
          className="rounded-full"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{title}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold">{comments?.length} Comments</p>
        </Link>
      </div>
    </div>
  );
};
