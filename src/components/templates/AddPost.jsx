import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getCategory } from "src/services/admin";
import { createPost } from "src/services/user";
import { getCookie } from "src/utils/cookies";

function AddPost() {
  const { data: data2 } = useQuery(["gat-categories"], getCategory);
const queryClient =useQueryClient()
  const { mutate, isLoading, data } = useMutation(createPost,{
    onSuccess:()=>{
      toast.success("آگهی با موفقیت اضافه شد")
      queryClient.invalidateQueries("get-post-list")
    }
  });

  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: "",
    city: "",
    category: "",
    images: "",
  });

  const changHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name !== "images") {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: event.target.files[0] });
    }
  };

  const addHandler = (event) => {
    event.preventDefault();

    let flag = false;

    const formData = new FormData();

    for (let i in form) {
      if (!form[i]) {
        flag = true;
      }
      formData.append(i, form[i]);
    }

    if (!flag) {
      mutate(formData);
    } else {
      toast.error("لطفا تمام فیلد ها را پر کنید");
    }
  };
  return (
    <form onChange={changHandler} className="flex flex-col">
      <h3 className="font-bold text-lg  border-b-3 w-fit pb-2 border-rose-800 mb-4">
        افزودن آگهی
      </h3>
      <label htmlFor="title">عنوان</label>
      <input
        type="text"
        name="title"
        id="title"
        className="outline-2 outline-gray-200 rounded-sm w-72 p-1 px-2 mt-2 mb-8"
      />
      <label htmlFor="content">توضیحات</label>
      <textarea
        name="content"
        id="content"
        className="outline-2 outline-gray-200 rounded-sm w-72 p-1 px-2 mt-2 mb-8 h-32"
      />
      <label htmlFor="amount">قیمت</label>
      <input
        type="number"
        name="amount"
        id="amount"
        className="outline-2 outline-gray-200 rounded-sm w-72 p-1 px-2 mt-2 mb-8"
      />
      <label htmlFor="city">شهر</label>
      <input
        type="text"
        name="city"
        id="city"
        className="outline-2 outline-gray-200 rounded-sm w-72 p-1 px-2 mt-2 mb-8"
      />
      <label htmlFor="category">دسته بندی</label>
      <select
        name="category"
        id="category"
        className="outline-2 outline-gray-200 rounded-sm w-72 p-1 px-2 mt-2 mb-8"
      >
        <option value="">..</option>
        {data2?.data.map((category) => (
          <option value={category._id} key={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <label htmlFor="images">عکس</label>
      <input
        type="file"
        name="images"
        id="images"
        accept="image/jpg,image/png ,image/jpeg"
        className="mt-2 mr-14 file:mr-4 file:rounded-full file:border-0 file:bg-rose-50 file:px-4 file:outline-none file:py-2 file:text-sm file:font-semibold require hover:file:text-rose-700 hover:file:bg-rose-100 dark:file:bg-rose-800 dark:file:text-white"
      />
      <button
        onClick={addHandler}
        disabled={isLoading}
        className=" w-fit  flex gap-1 disabled:bg-rose-400 bg-rose-800 px-4 py-1 mt-4 rounded-sm text-white transition-colors hover:bg-rose-700"
      >
        {isLoading ? (
          <>
            <img
              src="spinner.svg"
              className=" animate-spin motion-reduce:hidden  w-5"
            />
            درحال ایجاد...
          </>
        ) : (
          <>ایجاد</>
        )}
      </button>
      <Toaster />
    </form>
  );
}

export default AddPost;
