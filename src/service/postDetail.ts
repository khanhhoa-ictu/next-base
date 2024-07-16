import http from "@/lib/http";

export const getPostDetailAdmin = (id: number) =>
    http.get(`postDetail/admin/${id}`);