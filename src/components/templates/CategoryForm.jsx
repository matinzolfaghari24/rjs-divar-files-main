import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import { toast, ToastContainer } from "react-toastify";
import { createCategory } from "src/services/admin";

function CategoryForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });

  const { mutate, isLoading, error, data } = useMutation(createCategory, {
    onSuccess: () => {
      toast.success("دسته بندی با موفقیت اضافه شد");
      queryClient.invalidateQueries("get-categories");
    },
    onError: () => {
      toast.error("مشکلی پیش آمده است");
    },
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const submitHandler = (event) => {
    event.preventDefault();

    if (!form.name || !form.slug || !form.icon) {
      toast.error("لطفا تمام فیلد ها را پر کنید");
      return;
    }
    mutate(form);
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className="text-sm mt-10"
    >
      <h1 className="font-semibold border-b-3 border-rose-800 w-fit pb-1 text-[17px]">
        دسته بندی جدید
      </h1>
      <div className="mt-5  flex flex-col">
        <label htmlFor="name">اسم دسته بندی</label>
        <input
          type="text"
          name="name"
          id="name"
          className="border border-gray-300 w-56 rounded-sm outline-rose-800 p-1 mt-1"
        />
      </div>
      <div className="mt-5  flex flex-col">
        <label htmlFor="slug">اسلاگ</label>
        <input
          type="text"
          name="slug"
          id="slug"
          className="border border-gray-300 w-56 rounded-sm outline-rose-800 p-1 mt-1"
        />
      </div>
      <div className="mt-5  flex flex-col">
        <label htmlFor="icon">آیکون</label>
        <input
          type="text"
          name="icon"
          id="icon"
          className="border border-gray-300 w-56 rounded-sm outline-rose-800 p-1 mt-1"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="  flex gap-1 disabled:bg-rose-400 bg-rose-800 px-4 py-1 mt-4 rounded-sm text-white transition-colors hover:bg-rose-700"
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
      {/* <ToastContainer /> */}
      <Toaster />
    </form>
  );
}

export default CategoryForm;
