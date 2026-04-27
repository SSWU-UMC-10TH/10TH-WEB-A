import { axiosInstance } from "./axios"
import axios from "axios"; 
import { RequestSignupDto, RequestSigninDto, ResponseAuthDto } from "../types/auth"; 

export const postSignup = async (body: RequestSignupDto): Promise<any> => {
    const { data } = await axiosInstance.post("/v1/auth/signup", body);
    return data;
};

export const postSignin = async (body: RequestSigninDto): Promise<any> => {
    const { data } = await axiosInstance.post("/v1/auth/signin", body);
    return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.get("/v1/auth/me")
    return data;
}

export const postLogout = async() => {
    const {data} = await axiosInstance.post("/v1/auth/signout")
    return data;
}