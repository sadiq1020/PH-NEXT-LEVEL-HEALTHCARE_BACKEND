import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { AdminService } from "./admin.service";

// get all admin
const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllAdmins();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Admins fetched successfully",
    data: result,
  });
});

// get admin by id
const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const admin = await AdminService.getAdminById(id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Admin fetched successfully",
    data: admin,
  });
});

// update admin
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const updatedAdmin = await AdminService.updateAdmin(id as string, payload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Admin updated successfully",
    data: updatedAdmin,
  });
});

// delete admin (soft delete)
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  const result = await AdminService.deleteAdmin(id as string, user);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
