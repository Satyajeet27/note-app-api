import { Router } from "express";
import { createUser, userLogin } from "../controllers/user.controller";
import { authentication } from "../middlewares/authenticate";

const router = Router();

router.post("/signup", createUser);
router.post("/login", userLogin);
router.get("/", authentication, (req, res, next) => {
  res.send("testing auth");
});

export default router;
