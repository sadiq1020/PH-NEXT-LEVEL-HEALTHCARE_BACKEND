import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { SpecialtyRoutes } from "../modules/specialty/specialty.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/specialties", SpecialtyRoutes);

export const IndexRoutes = router;
