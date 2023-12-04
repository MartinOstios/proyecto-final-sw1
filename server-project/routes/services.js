import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/avatar/services')
	},
	filename: (req, file, cb) => {
		cb(null, "service-" + Date.now() + "-" + file.originalname)
	},
});
const uploads = multer({storage: storage});

import {
	CREATE,
	DELETE,
	READ_ALL,
	READ_BY_ID,
	UPDATE,
} from "../controllers/services.js";
import auth from "../middlewares/auth.js";

router.post("/new", [auth, uploads.array("images", 3)], CREATE);
router.get("/", READ_ALL);
router.get("/:id", READ_BY_ID);
router.patch("/:id", [auth, uploads.array("images", 3)], UPDATE);
router.delete("/:id", [auth], DELETE);

export default router;