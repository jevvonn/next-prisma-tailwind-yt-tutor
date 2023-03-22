import { UserType } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditPost from "./EditPost";

const getOwnPosts = async () => {
  const response = await axios.get("/api/post/myPosts");
  return response.data;
};

const ownPosts = () => {
  const { data, isLoading, error } = useQuery<UserType>({
    queryFn: getOwnPosts,
    queryKey: ["own-posts"],
  });
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {data?.posts?.map((post) => (
        <EditPost {...post} name={data.name} image={data.image} key={post.id} />
      ))}
    </>
  );
};

export default ownPosts;
