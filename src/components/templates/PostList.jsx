import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import DeleteModal from "components/modules/Deletemodal";
import Loader from "components/modules/Loader";
import { getPostList } from "src/services/user";
import { sp } from "src/utils/number";
import { shortenText } from "src/utils/shortText";

function PostList() {
  const { data, isLoading } = useQuery(["get-post-list"], getPostList);
  const baseURL = import.meta.env.VITE_BASE_URL;
  return (
    <div className="border-t-2 mt-10 border-gray-300">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3 className="font-bold text-lg mt-10 border-b-3 w-fit border-rose-800 mb-10">
            آگهی های شما
          </h3>
          {data.data.posts.map((post) => (
            <div
              key={post._id}
              className="w-full flex justify-between items-center border border-gray-300 rounded-sm p-2 my-2 "
            >
              <div className="flex gap-3 items-center">
                <img
                  src={`${baseURL}${post.images[0]}`}
                  className="w-25 h-15 rounded-sm"
                />
                <div>
                  <p className="text-[17px]">{post?.options?.title}</p>
                  <span className="text-sm text-gray-500">
                    {shortenText(post?.options?.content || "")}
                  </span>
                </div>
              </div>
                <div className="flex items-center">
              <div dir="ltr" >
                  <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                  <span>{sp(post.amount)}</span>
                </div>
                <DeleteModal post={post} />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
