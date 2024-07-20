import http from "@/lib/http";
import { IAddComment } from "@/types/post";

export const getPostDetailAdmin = (id: number) =>
    http.get(`postDetail/admin/${id}`);

export const getPostDetail = (slug: string) =>
  http.get(`getPostDetail/${slug}`);

export const getComment = (id: number) => http.get(`comment/${id}`);

export const addComment = (params: IAddComment) =>
  http.post("comment/add", params);

// export const addReply = (params: IAddReply) => sendPost("/reply/add", params);

export const deleteComment = (id: number) =>
  http.delete(`comment/delete/${id}`);

// export const getPostDetailAdmin = (id: number) =>
//   sendGet(`/postDetail/admin/${id}`);

// export const deleteCommentReply = (id: number) =>
//   sendDelete(`/comment/reply/${id}`);