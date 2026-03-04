import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DoctorRoutes } from "../modules/doctor/doctor.route";
import { SpecialtyRoutes } from "../modules/specialty/specialty.route";
import { UserRoutes } from "../modules/user/user.routes";
const router = Router();

router.use("/auth", AuthRoutes);
router.use("/specialties", SpecialtyRoutes);
router.use("/users", UserRoutes);
router.use("/doctors", DoctorRoutes);

export const IndexRoutes = router;
