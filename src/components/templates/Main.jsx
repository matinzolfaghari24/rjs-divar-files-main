import React from "react";
import { sp } from "src/utils/number";

function Main({ posts }) {
  const baseURL = import.meta.env.VITE_BASE_URL;

  console.log(posts);
  return (
    <div className="flex flex-wrap justify-between ">
      {posts.data.posts.map((post) => (
        <div className="border-2 border-gray-300 flex justify-between p-3 w-96 m-5 rounded-lg">
          <div className="flex flex-col justify-between">
            <p>{post.options?.title}</p>
            <div className="text-gray-500">
              <p>{sp(post.amount)}</p>
              <p>{post.options?.city}</p>
            </div>
          </div>
          <img src={`${baseURL}/${post.images[0]}`} className="size-36 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export default Main;
