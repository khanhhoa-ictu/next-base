import configProject from "@/config";
import { ICustomOption } from "@/types";

class HttpError extends Error {
    status: number
    payload: any

    constructor({status, payload}:{status:number, payload: any}){
        super("Http Error");
        this.status = status;
        this.payload = payload
    }
}

const request = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, option?: ICustomOption | undefined) =>{
    const body = option?.body ? JSON.stringify(option.body) : undefined;
    const baseHeaders = {
        "Content-Type": 'application/json'
    }
    const baseUrl = option?.baseUrl !== undefined  ? option?.baseUrl : configProject.NEXT_PUBLIC_ENDPOINT;
    const res = await fetch(`${baseUrl}/${url}`,{
        ...option,
        headers: {
            ...baseHeaders,
            ...option?.headers
        },
        body,
        method

    })
    const payload : Response = await res.json();
    const data = {
        status: res.status,
        payload
    }
    if(!res?.ok){
        throw new HttpError(data)
    }
    return data
}

const http = {
    get(url:string, option?: Omit<ICustomOption,'body'>| undefined){
        return request('GET', url, option)
    },

    post(url:string, body: any, option?: Omit<ICustomOption,'body'>| undefined){
        return request('POST', url, {...option, body})
    },
    put(url:string, body: any, option?: Omit<ICustomOption,'body'>| undefined){
        return request('PUT', url, {...option, body})
    },
    delete(url:string, body: any, option?: Omit<ICustomOption,'body'>| undefined){
        return request('DELETE', url, {...option, body})
    }

}

export default http