import validator from "validator";
import { promises as fs } from "fs"

import Address from "../models/Address.js";
import Provider from "../models/Provider.js";

const validate = (params, action) => {
	if (
		action === "POST" &&
		(
			!params.name
		)
	)
		return false;
	const name = params.name
		? validator.isLength(params.name, { min: 1, max: 40 })
		: null;
	if (params.name && !name) return false;

	return true;
};

const CREATE = async (req, res) => {
	const params = req.body;
	if (req.file) {
		const file = req.file;
		params.avatarClient = `http://localhost:3100/public/providers/${file.filename}`;
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
		if (params.country && params.department && params.municipality) {
			const address = new Address({
				country: params.country,
				department: params.department,
				municipality: params.municipality
			});
			
			await address.save();
			params.address = address
		}
		const provider = new Provider(params);
		await provider.save();
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Provider saved successfully",
			provider: provider,
		});
	} catch (e) {
		if (
			params.avatarServer &&
			params.avatarServer != "uploads/avatar/default.png"
		)
			await fs.unlink(params.avatar);
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Provider couldn't be saved",
			details: e,
		});
	}
}

const READ_ALL = async (req, res) => {
	try {
		const providers = await Provider.find({}).populate('address');
		return res.status(200).send(providers);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get providers",
			details: e,
		});
	}
}

const READ_BY_ID = async (req, res) => {
	const id = req.params.id;
	try {
		const provider = await Provider.findById(id);
		if (!provider) {
			return res.status(404).json({
				status: 404,
				type: "error",
				message: "Provider not found"
			});
		}
		return res.status(200).send(provider);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get provider",
			details: e.message
		});
	}
}

const UPDATE = async (req, res) => {
	const id = req.params.id;
	const updateParams = req.body;
	if (req.file) {
		const file = req.file;
		params.avatarClient = `http://localhost:3100/public/providers/${file.filename}`;
		params.avatarServer = file.path;
	}
	if (!req.file && updateParams.avatarServer !== undefined && updateParams.avatarServer === ""){
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "File couldn't be uploaded",
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
		if (updateParams.address) {
			updateParams.address = await Address.findById(updateParams.address);
		}

		const updatedProvider = await Provider.findByIdAndUpdate(id, {...updateParams});
		if (updateParams.avatarServer && updatedProvider.avatarServer != "uploads/avatar/default.png")
			await fs.unlink(updatedProvider.avatarServer);
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Provider updated successfully",
			provider: updatedProvider
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get provider",
			details: e.message,
		});
	}
}

const DELETE = async (req, res) => {
	const id = req.params.id;
	try {
		const provider = await Provider.findByIdAndDelete(id);
		if (provider.avatarServer && provider.avatarServer != "uploads/avatar/default.png")
			await fs.unlink(provider.avatarServer);
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Provider deleted successfully",
			provider: provider
		});
	}
	catch(e){
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not delete provider",
			details: e.message,
		});
	}
}

export { CREATE, READ_ALL, READ_BY_ID, UPDATE, DELETE };
