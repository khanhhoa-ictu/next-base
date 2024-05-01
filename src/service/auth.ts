import http from "@/lib/http"

export const login = (infoUser:any) =>{
    return http.post('login',infoUser)
}