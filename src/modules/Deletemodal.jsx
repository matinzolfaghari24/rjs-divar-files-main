import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "src/services/admin";
import toast, { Toaster } from "react-hot-toast";
import { deletePost } from "src/services/user";
// import { toast, ToastContainer } from "react-toastify";

export function DeleteModal({ category, post }) {
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();

  const handleOpen = () => setOpen(!open);

  const deleteHandler = async (id) => {
    if (category) {
      const { data } = await deleteCategory(id);
      if (data) {
        toast.success("دسته بندی با موفقیت حذف شد");
        handleOpen();
        queryClient.invalidateQueries("get-categories");
      }
    } else {
      const { data } = await deletePost(id);
      if (data) {
        toast.success("آگهی با موفقیت حذف شد");
        handleOpen();
        queryClient.invalidateQueries("get-post-list");
      }
    }
  };

  return (
    <>
      <button onClick={handleOpen} className="outline-none">
        <img
          src="delete.svg"
          className="mr-3  rounded-lg transition-all hover:bg-rose-100 cursor-pointer p-1 w-6"
        />
      </button>
      <Dialog
        className="flex flex-col justify-start"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="font-bold">حذف دسته بندی</DialogHeader>
        <DialogBody className="text-lg font-bold">
          آیا مطمعن به حذف
          <span className="text-rose-800">
            «{category ? category?.name : post?.options?.title}»
          </span>
          هستید؟
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>لغو</span>
          </Button>
          <Button
            className="bg-rose-800"
            onClick={() => deleteHandler(category ? category._id : post._id)}
          >
            <span>حذف</span>
          </Button>
        </DialogFooter>
      </Dialog>
      {/* <ToastContainer /> */}
      <Toaster />
    </>
  );
}

export default DeleteModal;
