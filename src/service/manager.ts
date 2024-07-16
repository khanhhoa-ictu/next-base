import http from "@/lib/http";
import { IPost } from "@/types/managerType";

export const getAllPost = () => {
  return http.get("post/getAllPost");
};

export const getPostManager = (token: string) => {
  return http.get("manager/getPost", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addPost = (data:IPost) =>{
  return http.post("manager/addPost", data);
}