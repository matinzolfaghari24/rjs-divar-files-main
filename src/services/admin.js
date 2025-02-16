import api from "src/configs/api";
const createCategory = (data) => api.post("category", data);

const getCategory = () => api.get("category");

const deleteCategory =async (id)=> await api.delete(`category/${id}`)
export { createCategory,getCategory,deleteCategory };
