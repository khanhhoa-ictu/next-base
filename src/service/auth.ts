import http from "@/lib/http"

export const login = (infoUser:any) =>{
    return http.post('login',infoUser)
}

export const authApiRequest ={
    authNextServer:(body:any)=>{
        return http.post('api/auth', body,{
            baseUrl:''
        })
    },
    logoutNextClientToNextServer:()=>{
        return http.post('api/auth/logout', {},{
            baseUrl:''
        })
    }
}