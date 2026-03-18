/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import z from "zod";
import { Prisma } from "../../generated/prisma/client";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import {
  handlePrismaClientKnownRequestError,
  handlePrismaClientUnknownError,
  handlePrismaClientValidationError,
  handlerPrismaClientInitializationError,
  handlerPrismaClientRustPanicError,
} from "../errorHelpers/handlePrismaError";
import { handleZodError } from "../errorHelpers/handleZodError";
import { TErrorResponse, TErrorSources } from "../interfaces/error.interface";
import { deleteUploadedFilesFromGlobalErrorHandler } from "../utils/deleteUploadedFileFromGlobalErrorHandler";
// import { TErrorResponse, TErrorSources } from "../interfaces/errorInterface";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envVars.NODE_ENV === "development") {
    console.log("Error Data from Error Handler", err);
  }
  //   console.log(err);

  // delete image (Module: 40-03) [commented and edited in Module: 42-05]
  /*
  if (req.file) {
    await deleteFileFromCloudinary(req.file.path);
  }

  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    const imageUrls = req.files.map((file) => file.path);
    await Promise.all(imageUrls.map((url) => deleteFileFromCloudinary(url)));
  }
  */

  // Module: 42-05
  await deleteUploadedFilesFromGlobalErrorHandler(req);
  // --------

  let errorSources: TErrorSources[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internal Server Error";
  let stack: string | undefined = undefined;

  // module (43) ---------------------
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handlePrismaClientKnownRequestError(err);
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    const simplifiedError = handlePrismaClientUnknownError(err);
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handlePrismaClientValidationError(err);
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    const simplifiedError = handlerPrismaClientRustPanicError();
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    const simplifiedError = handlerPrismaClientInitializationError(err);
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = err.stack;

    // -----------------------------------------
  } else if (err instanceof z.ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;

    errorSources = [...simplifiedError.errorSources!];
    stack = err.stack;

    // statusCode = status.BAD_REQUEST;
    // message = "Zod Validation Error";

    // // module: 38-07
    // err.issues.forEach((issue) => {
    //   errorSources.push({
    //     // path: issue.path.join(" => ") || "unknown",
    //     // path: issue.path.length >1 ? issue.path.join(" => "): issue.path[0].toString(),
    //     path: issue.path.join(" => "),
    //     message: issue.message,
    //   });
    // });
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  const errorResponse: TErrorResponse = {
    success: false,
    message: message,
    errorSources,
    stack: envVars.NODE_ENV === "development" ? stack : undefined,
    error: envVars.NODE_ENV === "development" ? err : undefined,
  };

  res.status(statusCode).json(errorResponse);
};
