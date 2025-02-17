import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "src/components/modules/Loader";
import Main from "src/components/templates/Main";
import Sidebar from "src/components/templates/Sidebar";
import { getCategory } from "src/services/admin";
import { getAllPostList } from "src/services/user";

function HomePage() {
  const { data: categories, isLoading: categoryLoading } = useQuery(
    ["get-categories"],
    getCategory
  );
  const { data: posts, isLoading: postsLoading } = useQuery(
    ["get-posts"],
    getAllPostList
  );
  return (
    <>
      {categoryLoading || postsLoading ? (
        <Loader />
      ) : (
        <div className="flex">
          <Sidebar categories={categories} />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;
