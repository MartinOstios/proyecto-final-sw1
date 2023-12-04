import express from "express";

const router = express.Router();
import auth from "../middlewares/auth.js";

import {
	GETME,
	LOGIN,
	GENERATECODE,
	ACTIVATE,
	SENDRECOVERY
} from "../controllers/users.js"

import { CREATE } from "../controllers/users.js";


router.post("/login", LOGIN);
router.post("/signin", CREATE);
router.get("/me", [auth], GETME);
router.post("/generate", GENERATECODE);
router.post("/activate", ACTIVATE);
router.post("/send", SENDRECOVERY);


export default router;