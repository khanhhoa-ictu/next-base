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
    logoutNextClientToNextServer:(force?: boolean)=>{
        return http.post('api/auth/logout', {
            force
        },{
            baseUrl:''
        })
    }
}

export const getProfile = () => http.get("user/profile");