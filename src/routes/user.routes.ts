import { Router } from "express";
import {
  createUser,
  getuserInfo,
  updateUserProfile,
  userLogin,
} from "../controllers/user.controller";
import { authentication } from "../middlewares/authenticate";

const router = Router();

router.post("/signup", createUser);
router.post("/login", userLogin);
router.get("/", authentication, getuserInfo);
router.put("/update-user", authentication, updateUserProfile);

export default router;
