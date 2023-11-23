import express from "express";
import multer from "multer";
import path from "path"

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/avatar/users')
	},
	filename: (req, file, cb) => {
		cb(null, "avatar-" + Date.now() + "-" + file.originalname)
	},
});
const fileFilter = (req, file, cb) => {
	const allowedFileTypes = [".jpeg", ".jpg", ".png"];
	const fileExtension = path.extname(file.originalname).toLowerCase();

	if (allowedFileTypes.includes(fileExtension)) {
		cb(null, true);
	} else {
		cb(console.error("File not permitted"));
	}
};

const uploads = multer({storage: storage, fileFilter: fileFilter});

import { CREATE, DELETE, READ_ALL, READ_BY_MAIL, UPDATE } from "../controllers/users.js";
import auth from "../middlewares/auth.js";
import self from "../middlewares/self.js";

router.post("/new", [uploads.single("avatar")], CREATE);
router.get("/", READ_ALL);
router.get("/:mail", [auth, self], READ_BY_MAIL);
router.patch("/:mail", [auth, uploads.single("avatar")], UPDATE);
router.delete("/:mail", [auth], DELETE);




export default router;