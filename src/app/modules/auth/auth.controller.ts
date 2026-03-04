import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { tokenUtils } from "../../utils/token";
import { authService } from "./auth.service";

// sign up a patient
const registerPatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await authService.registerPatient(payload);

  const { accessToken, refreshToken, token, ...rest } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Patient created successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});

// sign in a user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await authService.loginUser(payload);

  const { accessToken, refreshToken, token, ...rest } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  tokenUtils.setBetterAuthSessionCookie(res, token);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "User logged in successfully",
    data: {
      token,
      refreshToken,
      ...rest,
    },
  });
});

export const authController = {
  registerPatient,
  loginUser,
};
