import http from "@/lib/http"

export const getAccount = (id:any) =>{
    return http.get(`about`)
}

export const getAccountSever = (token:any)=>{
    return http.get(`about`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}