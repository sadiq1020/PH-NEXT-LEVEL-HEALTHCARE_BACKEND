import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { createDoctorZodSchema } from "./userValidation";

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
  UserController.createDoctor,
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
