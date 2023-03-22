import { UserType } from "@/types/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Toggle from "../Toggle";

interface Props {
  image: string;
  name: string;
  title: string;
  id: string;
  comments?: {
    id: string;
    createdAt: string;
    message: string;
    user: UserType;
  }[];
}

const EditPost = ({ image, name, title, id, comments }: Props) => {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID = "toogle";

  const { mutate } = useMutation(
    async (id: string) => await axios.delete("/api/post/delete", { data: id }),
    {
      onError(error) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
      },
      onSuccess(data) {
        queryClient.invalidateQueries(["own-posts"]);
        toast.success("Post has been deleted.", { id: toastPostID });
      },
    }
  );

  const onCloseToggle = () => {
    setToggle(false);
  };

  const openToggle = () => {
    setToggle(true);
  };

  const onDelete = async () => {
    onCloseToggle();
    toast.loading("Deleting your post.", { id: toastPostID });
    mutate(id);
  };

  return (
    <>
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
          <button onClick={openToggle} className="text-red-600 text-sm">
            Delete
          </button>
        </div>
      </div>

      {toggle ? <Toggle onClose={onCloseToggle} onDelete={onDelete} /> : null}
    </>
  );
};

export default EditPost;
