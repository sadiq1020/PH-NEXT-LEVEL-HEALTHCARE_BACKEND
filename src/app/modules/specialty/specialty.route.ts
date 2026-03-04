import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { SpecialtyController } from "./specialty.controller";

const router = Router();

router.post(
  "/",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
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
