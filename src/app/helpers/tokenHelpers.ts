import { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../../config";
import { jwtHelpers } from "./jwtHelpers";
import { cookieUtils } from "./cookie";
import { Response } from "express";

const getAccessToken = (payload: JwtPayload) => {
    const accessToken = jwtHelpers.generateToken(payload, envConfig.JWT_ACCESS_SECRET as string, envConfig.JWT_ACCESS_EXPIRES_IN as string);
    return accessToken;
};

const getRefreshToken = (payload: JwtPayload) => {
    const refreshToken = jwtHelpers.generateToken(payload, envConfig.JWT_REFRESH_SECRET as string, envConfig.JWT_REFRESH_EXPIRES_IN as string);
    return refreshToken;
};

const setAccessTokenCookie = (res: Response, accessToken: string) => {
    cookieUtils.setCookie(res, 'accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 60 * 60 * 24 * 1000 // 1 day
    })
};

const setBetterAuthSessionCookie = (res: Response, token: string) => {
    cookieUtils.setCookie(res, "better-auth.session_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: '/',
        //1 day
        maxAge: 60 * 60 * 24 * 1000,
    });
}

const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
    cookieUtils.setCookie(res, 'refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 60 * 60 * 24 * 1000 // 1 day
    })
};
   

export const tokenHelpers = {
    getAccessToken,
    getRefreshToken,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    setBetterAuthSessionCookie
}