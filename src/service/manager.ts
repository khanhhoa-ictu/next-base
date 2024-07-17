import http from "@/lib/http";
import { IPost } from "@/types/managerType";

export const getAllPost = (params:any) => {
  return http.get(`getPost/${params.page}`);
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

export const deletePost = (id: number) => http.delete(`manager/delete/${id}`);

export const editPost = (params: any) => http.put("manager/editPost", params);

//user 

export const getUser = () => http.get("manager/user");

export const deleteUser = (id: number) => http.delete(`manager/user/${id}`);