import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type DataProps = {
  title: string;
  id: string;
};

export const AddComment = ({ id }: { id: string }) => {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID: string = "comment";

  const { mutate } = useMutation(
    async (data: DataProps) => await axios.post("/api/post/comment", { data }),
    {
      onError(error) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID });
        }
        setIsDisabled(false);
      },
      onSuccess(data) {
        toast.success("Comment has been made.", { id: toastPostID });
        queryClient.invalidateQueries(["post-detail"]);
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Adding your comment", { id: toastPostID });
    setIsDisabled(true);
    mutate({ title, id });
  };

  return (
    <form
      className="flex w-full justify-center flex-col items-center mt-3"
      onSubmit={submitPost}
    >
      <textarea
        name="title"
        className="w-full h-20 resize-none p-4 rounded-xl focus:outline-none text-lg"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder={"Comment on this post..."}
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
          className="bg-blue-600 py-2 px-4  text-white font-medium rounded-md hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
        >
          Post Your Comment
        </button>
      </div>
    </form>
  );
};
