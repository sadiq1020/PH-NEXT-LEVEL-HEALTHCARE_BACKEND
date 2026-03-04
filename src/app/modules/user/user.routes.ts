import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { createAdminZodSchema, createDoctorZodSchema } from "./userValidation";

const router = Router();

// // video: 38-07
// const validateRequest = (zodSchema: z.ZodObject) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const parsedResult = zodSchema.safeParse(req.body);
//     if (!parsedResult.success) {
//       next(parsedResult.error);
//     }
//     // sanitizing the data
//     req.body = parsedResult.data;
//     next();
//   };
// };

router.post(
  "/create-doctor",
  validateRequest(createDoctorZodSchema),
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserController.createDoctor,
);

router.post(
  "/create-admin",
  validateRequest(createAdminZodSchema),
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserController.createAdmin,
);

export const UserRoutes = router;

/*
(req: Request, res: Response, next: NextFunction) => {
  // console.log(req.body, "before");
  const parsedResult = createDoctorZodSchema.safeDecode(req.body);

  if (!parsedResult.success) {
    next(parsedResult.error);
  }

  // sanitize the data
  req.body = parsedResult.data;
  // console.log(parsedResult, "after");

  next();
},
*/
