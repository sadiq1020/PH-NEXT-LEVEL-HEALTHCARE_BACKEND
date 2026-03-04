import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { UserService } from "./user.service";

// create doctor
const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await UserService.createDoctor(payload);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Doctor registered successfully",
    data: result,
  });
});

// create admin by super admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createAdmin(req.body);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

export const UserController = {
  createDoctor,
  createAdmin,
};
