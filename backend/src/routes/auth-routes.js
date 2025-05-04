import express from "express";
const router = express.Router();

import { loginUser } from "../controllers/authController.js";
import { signupUser } from "../controllers/authController.js";
import { checkEmailExists } from "../controllers/authController.js";
import { checkUsernameExists } from "../controllers/authController.js";

router.get("/", (req, res) => {
  res.send("Auth route is working");
});

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/check-username/:username", checkUsernameExists);
router.get("/check-email/:email", checkEmailExists);

export default router;
