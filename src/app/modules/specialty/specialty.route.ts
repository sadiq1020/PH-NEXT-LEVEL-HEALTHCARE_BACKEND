import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";

const router = Router();

router.post("/", SpecialtyController.createSpecialty);
router.get("/", SpecialtyController.getAllSpecialty);
router.delete("/:id", SpecialtyController.deleteSpecialty);
router.put("/:id", SpecialtyController.updateSpecialty);

export const SpecialtyRoutes = router;
