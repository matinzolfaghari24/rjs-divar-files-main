import axios from "axios";
import api from "configs/api";
import { getCookie } from "utils/cookies";

const token = getCookie("accessToken");

const getProfile = () =>
  api
    .get("user/whoami", {
      headers: { Authorization: `bearer ${token ? token : ""}` },
    })
    .then((res) => res || false);

const createPost = (formData) => {
  return axios.post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `bearer ${token}`,
    },
  });
};

const getPostList = () => api.get("post/my");

const deletePost = async (id) => await api.delete(`post/delete/${id}`);

export { getProfile, createPost, getPostList, deletePost };
