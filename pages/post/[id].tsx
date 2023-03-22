import Comments from "@/components/post/Comments";
import { Post } from "@/components/post/Post";
import { PostType } from "@/types/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { AddComment } from "../../components/post/AddComment";

const getPost = async (id: string) => {
  const response = await axios.get(`/api/post/${id}`);
  return response.data;
};

const PostShow = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery<PostType>({
    queryFn: () => getPost(id),
    queryKey: ["post-detail"],
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {data && (
        <div>
          <Post {...data} />
          <AddComment id={id} />

          {data.comments?.length ? (
            <>
              <h2 className="text-lg font-semibold">All Comments</h2>
              {data.comments.map((cmt) => (
                <Comments {...cmt} />
              ))}
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.id;

  return {
    props: {
      id,
    },
  };
}

export default PostShow;
