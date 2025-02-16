import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import { toast, ToastContainer } from "react-toastify";
import DeleteModal from "src/modules/DeleteModal";
import Loader from "src/modules/Loader";
import { getCategory } from "src/services/admin";

function CategoryList() {
  const { data, isLoading } = useQuery(["get-categories"], getCategory);
  if (isLoading) return <Loader />;
  console.log({ data, isLoading });

    // toast.success("دسته بندی با موفقیت حذف شد",{
    //   position:"top-center"
    // })

  return (
    <div className="w-full">
      {data.data.map((category) => (
        <div
          key={category._id}
          className="w-full mb-5 border-2 border-gray-200 p-3 rounded-lg flex justify-between"
        >
          <div className="w-full flex  gap-2 items-center ">
            <img src={`${category.icon}.svg`} className="w-5" />
            <p>{category.name}</p>
          </div>
          <div dir="ltr" className="flex w-72  items-center">
            <DeleteModal category={category} />
            <p className="text-rose-300">slug : {category.slug}</p>
          </div>
        </div>
      ))}
      {/* <Toaster /> */}
    </div>
  );
}

export default CategoryList;
