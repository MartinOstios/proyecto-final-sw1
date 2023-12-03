import validator from "validator";
import { promises as fs } from "fs"

import User from "../models/User.js";
import Role from "../models/Role.js";
import Address from "../models/Address.js";
import { generateToken } from "../services/jwt.js";

const validate = (params, action) => {
	if (
		action === "POST" &&
		(
			!params.name ||
			!params.lastname ||
			!params.email ||
			!params.password
		)
	)
		return false;
	const name = params.name
		? validator.isLength(params.name, { min: 1, max: 40 })
		: null;
	const lastname = params.lastname
		? validator.isLength(params.lastname, { min: 1, max: 40 })
		: null;
	const email = params.email ? validator.isEmail(params.email) : null;
	const pwd = params.password
		? validator.isLength(params.password, { min: 8, max: 20 })
		: null;
	const active = params.active ? validator.isBoolean(params.active) : null;
	const avatarServer = params.avatarServer
		? validator.isLength(params.avatarServer, { min: 21 })
		: null;
	if (params.name && !name) return false;
	if (params.lastname && !lastname) return false;
	if (params.email && !email) return false;
	if (params.current_password && !pwd) return false;
	if (params.active && !active) return false;
	if (params.avatarServer && !avatarServer) return false;
	return true;
};

const CREATE = async (req, res) => {
	const params = req.body;
	console.log(params);
	if (req.file) {
		const file = req.file;
		params.avatarClient = `http://localhost:3100/public/users/${file.filename}`;
		params.avatarServer = file.path;
	}
	if (!req.file && params.avatarServer !== undefined && params.avatarServer === ""){
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "File couldn't be uploaded",
		});
	}
	if (!validate(params, "POST")) {
		if (
			params.avatarServer &&
			params.avatarServer != "uploads/avatar/default.png"
		)
			await fs.unlink(params.avatarServer);
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Missing or incorrect data",
		});
	}
	try {
		if (params.role){
			params.role = await Role.findById(params.role);
		}
		if (params.address) {
			params.address = await Address.findById(params.address);
		}
		const user = new User(params);
		await user.save();
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "User saved successfully",
			user: user,
		});
	} catch (e) {
		if (
			params.avatarServer &&
			params.avatarServer != "uploads/avatar/default.png"
		)
			await fs.unlink(params.avatarServer);
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "User couldn't be saved",
			details: e,
		});
	}
}

const READ_ALL = async (req, res) => {
	try {
		const users = await User.find().populate('role');
		return res.status(200).send(users);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get users",
			details: e,
		});
	}
}

const READ_BY_MAIL = async (req, res) => {
	const mail = req.params.mail;
	if (!validator.isEmail(mail)) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Invalid email",
		});
	}
	try {
		const users = await User.find({ email: mail }).populate('role');
		if (users.length === 0) {
			return res.status(404).json({
				status: 404,
				type: "error",
				message: "User not found"
			});
		}
		return res.status(200).send(users[0]);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get user",
			details: e.message
		});
	}
}

const UPDATE = async (req, res) => {
	const mail = req.params.mail;
	const updateParams = req.body;
	if (req.file) {
		const file = req.file;
		updateParams.avatarClient = `http://localhost:3100/public/users/${file.filename}`;
		updateParams.avatarServer = file.path;
	}
	if (!req.file && updateParams.avatarServer !== undefined && updateParams.avatarServer === ""){
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "File couldn't be uploaded",
		});
	}
	if (!validator.isEmail(mail)) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Invalid email",
		});
	}
	if(!validate(updateParams, "PATCH")) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Missing or incorrect data",
		});
	}
	try {
		if (updateParams.role) {
			updateParams.role = await Role.findById(updateParams.role);
		}
		if (updateParams.address) {
			updateParams.address = await Address.findById(updateParams.address);
		}
		const users = await User.find({ email: mail });
		if (users.length == 0) {
			return res.status(404).json({
				status: 404,
				type: "error",
				message: "User not found"
			});
		}

		const updatedUser = await User.findByIdAndUpdate(users[0]._id, {...updateParams});
		if (updateParams.avatarServer && updatedUser.avatarServer != "uploads/avatar/default.png")
			await fs.unlink(updatedUser.avatarServer);
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "User updated successfully",
			user: updatedUser
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get user",
			details: e.message,
		});
	}
}

const DELETE = async (req, res) => {
	const mail = req.params.mail;
	if (!validator.isEmail(mail)) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Invalid email",
		});
	}
	try {
		const users = await User.find({email: mail});
		if(users.length == 0){
			return res.status(404).json({
				status: 404,
				type: "error",
				message: "User not found"
			});
		}
		const user = await User.findByIdAndDelete(users[0]._id);
		if (user.avatarServer && user.avatarServer != "uploads/avatar/default.png")
			await fs.unlink(user.avatarServer);
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "User deleted successfully",
			user: user
		});
	}
	catch(e){
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not delete user",
			details: e.message,
		});
	}
}


const LOGIN = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Missing or incorrect data",
		});
	}
	if (!validator.isEmail(email)) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Invalid email",
		});
	}
	try {
		const user = await User.findOne({ email: email });
		if (!user) throw new Error();
		if(user.password === password){
			const token = generateToken(user);
			return res.status(200).json({access: token, user: user});
		}
		else throw new Error()

	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get user",
			details: e.message
		});
	}
}

const GETME = async (req, res) => {
    try {
        const { _id } = req.user._doc;
        const userFind = await User.findById(_id).populate('role');
        res.status(200).json(userFind);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export { CREATE, READ_ALL, READ_BY_MAIL, UPDATE, DELETE, LOGIN, GETME };
