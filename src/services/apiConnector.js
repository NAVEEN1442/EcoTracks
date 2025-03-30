import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method,url,bodyData,headers,params)=>{
    try {
        console.log("method,url,bodyData,headers,params",method,url,bodyData,headers,params);
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers : headers ? headers : null,
        params : params ? params : null,

    });
    } catch (error) {
        console.log("error in apiconnector",error);
    }   
}