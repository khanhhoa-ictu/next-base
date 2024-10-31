import http from "@/lib/http";
import { forgotPassword } from "../types/user-type";

export const requestPassword = (email: forgotPassword) =>
    http.post("forgot/request", email);

export const verifyPassword = (otp: forgotPassword) =>
    http.post("forgot/verify", otp);

export const forgotPassWord = (newPassword: forgotPassword) =>
    http.post("forgot/password", newPassword);