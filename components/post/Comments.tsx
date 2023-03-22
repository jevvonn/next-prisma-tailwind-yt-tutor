import { CommentType } from "@/types/Comment";
import Image from "next/image";

const Comments = ({ user: { image, name }, message }: CommentType) => {
  return (
    <div className="bg-white w-full p-4 mt-4 rounded-lg">
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
        <p className="break-all">{message}</p>
      </div>
    </div>
  );
};

export default Comments;
