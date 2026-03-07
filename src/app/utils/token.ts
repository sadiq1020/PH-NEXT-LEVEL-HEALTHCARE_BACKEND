import { Response } from "express";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { envVars } from "../config/env";
import { CookieUtils } from "./cookies";
import { jwtUtils } from "./jwt";

// creating access token
const getAccessToken = (payload: JwtPayload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    envVars.ACCESS_TOKEN_SECRET,
    { expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN } as SignOptions,
  );
  return accessToken;
};

const getRefreshToken = (payload: JwtPayload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    envVars.REFRESH_TOKEN_SECRET,
    { expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN } as SignOptions,
  );
  return refreshToken;
};

// set Access token cookie (module: 38-10)
const setAccessTokenCookie = (res: Response, token: string) => {
  //   const maxAge = ms(envVars.ACCESS_TOKEN_EXPIRES_IN as StringValue); --> Not working

  CookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    // 1 day
    maxAge: 60 * 60 * 24 * 1000,
  });
};

// set Refresh token cookie
const setRefreshTokenCookie = (res: Response, token: string) => {
  //   const maxAge = ms(envVars.REFRESH_TOKEN_EXPIRES_IN as StringValue); --> not working

  CookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    // 7 days
    maxAge: 60 * 60 * 24 * 1000 * 7,
  });
};

// set better auth session cookie manually
const setBetterAuthSessionCookie = (res: Response, token: string) => {
  //   const maxAge = ms(envVars.REFRESH_TOKEN_EXPIRES_IN as StringValue);

  CookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    // 1 day
    maxAge: 60 * 60 * 24 * 1000,
  });
};

export const tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCookie,
};
