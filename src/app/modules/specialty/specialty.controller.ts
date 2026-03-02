import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { SpecialtyService } from "./specialty.service";

// create specialty
const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await SpecialtyService.createSpecialty(payload);

  // res.status(201).json({
  //   success: true,
  //   message: "Specialty created successfully",
  //   data: result,
  // });
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Specialty created successfully",
    data: result,
  });
});

/*
moved to shared folder named catch   --------------- video: 37-09 ---------------
const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch",
        error: error.message,
      });
    }
  };
};
*/

// get all specialty
const getAllSpecialty = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtyService.getAllSpecialties();

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Specialty fetched successfully",
    data: result,
  });
});

// delete a specialty
const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SpecialtyService.deleteSpecialty(id as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Specialty deleted successfully",
    data: result,
  });
});

// update a specialty
const updateSpecialty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SpecialtyService.updateSpecialty(id as string, req.body);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Specialty updated successfully",
    data: result,
  });
});

export const SpecialtyController = {
  createSpecialty,
  getAllSpecialty,
  deleteSpecialty,
  updateSpecialty,
};
