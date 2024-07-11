import http from "@/lib/http"

export const getAllPost = () =>{
    return http.get('post/getAllPost')
}
