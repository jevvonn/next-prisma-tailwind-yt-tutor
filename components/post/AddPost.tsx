import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const AddPost = () => {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID: string = "create";

  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/post/create", { title }),
    {
      onError(error) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
        setIsDisabled(false);
      },
      onSuccess(data) {
        toast.success("Post has been made.", { id: toastPostID });
        queryClient.invalidateQueries(["posts"]);
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Creating your posts", { id: toastPostID });
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form
      className="flex w-full justify-center flex-col items-center"
      onSubmit={submitPost}
    >
      <textarea
        name="title"
        className="w-full h-40 resize-none p-4 rounded-xl focus:outline-none text-lg"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder={"What's on your mind ?"}
      ></textarea>
      <div
        className={`w-full flex justify-between items-center mt-2 ${
          title.length > 300 ? "text-red-600" : "text-black"
        }`}
      >
        <p>{title.length} / 300</p>
        <button
          type="submit"
          disabled={isDisabled || title.length > 300}
          className="bg-green-600 py-2 px-4  text-white font-medium rounded-md hover:bg-green-700 disabled:pointer-events-none disabled:opacity-50"
        >
          Post
        </button>
      </div>
    </form>
  );
};
