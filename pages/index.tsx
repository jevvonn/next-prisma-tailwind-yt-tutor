import { AddPost } from "@/components/post/AddPost";
import Head from "next/head";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Post } from "@/components/post/Post";
import { PostType } from "@/types/Post";

const getPosts = async () => {
  const res = await axios.get("/api/post");
  return res.data;
};

export default function Home() {
  const { data, isLoading, error } = useQuery<PostType[]>({
    queryFn: getPosts,
    queryKey: ["posts"],
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>

      <AddPost />

      {isLoading && <p>Loading...</p>}
      {data?.map((post) => (
        <Post {...post} key={post.id} />
      ))}
    </>
  );
}
