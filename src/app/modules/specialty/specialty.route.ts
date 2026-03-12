import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { SpecialtyController } from "./specialty.controller";
import { SpecialtyValidation } from "./specialty.validation";

const router = Router();

router.post(
  "/",
  // checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  multerUpload.single("file"),
  validateRequest(SpecialtyValidation.createSpecialtyZodSchema), // module: 40-02
  SpecialtyController.createSpecialty,
);
router.get("/", SpecialtyController.getAllSpecialty);
router.delete("/:id", SpecialtyController.deleteSpecialty);
router.put(
  "/:id",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  SpecialtyController.updateSpecialty,
);

export const SpecialtyRoutes = router;
