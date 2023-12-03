import express from "express";

const router = express.Router();
import auth from "../middlewares/auth.js";

import {
	GETME,
	LOGIN
} from "../controllers/users.js"

import { CREATE } from "../controllers/users.js";


router.post("/login", LOGIN);
router.post("/signin", CREATE);
router.get("/me", [auth], GETME);


export default router;