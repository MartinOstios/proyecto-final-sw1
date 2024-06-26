import Category from "../models/Category.js";
import Service from "../models/Service.js"
import validator from "validator"
import { promises as fs } from "fs"

const validate = (params, action) => {
	if (
		action === "POST" &&
		(
			!params.name ||
			!params.description
		)
	)
		return false;
	const name = params.name
		? validator.isLength(params.name, { min: 3 })
		: null;
	const description = params.description
		? validator.isLength(params.description, { min: 5 })
		: null;
	const active = params.active
		? validator.isBoolean(params.active)
		: null;

	if (params.name && !name) return false;
	if (params.description && !description) return false;
	if (params.active && !active) return false;
	return true;
};

const CREATE = async (req, res) => {
	const params = req.body;
	if (req.files.length > 0) {
		params.imagesClient = [];
		params.imagesServer = [];
		req.files.forEach((file) => {
			params.imagesClient.push(`http://localhost:3100/public/services/${file.filename}`);
			params.imagesServer.push(file.path);
		})
	}
	if (!validate(params, "POST")) {
		if (params.imagesServer) {
			params.imagesServer.forEach(async (image) => {
				await fs.unlink(image);
			})
		}
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Missing or incorrect data",
		});
	}
	try {
		if (params.category) {
			const category1 = await Category.findById(params.category);
			const category2 = await Category.findById('656df1c115cc52697e6b100f');
			params.category = [category1, category2];
		} else {
			const category2 = await Category.findById('656df1c115cc52697e6b100f');
			params.category = [undefined, category2];
		}


		const service = new Service(params);
		await service.save();
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Service saved successfully",
			service: service,
		});
	} catch (e) {
		if (params.imagesServer) {
			params.imagesServer.forEach(async (image) => {
				await fs.unlink(image);
			})
		}

		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Service couldn't be saved",
			details: e.message,
		});
	}
};

const READ_ALL = async (req, res) => {
	try {
		const services = await Service.find().populate('category').populate('provider');
		return res.status(200).send(services);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get services",
			details: e,
		});
	}
};

const READ_BY_ID = async (req, res) => {
	const id = req.params.id;
	if (!id) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "ID not received",
		});
	}
	try {
		const service = await Service.findById(id);
		return res.status(200).send(service);
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not get service",
			details: e.message,
		});
	}
};

const UPDATE = async (req, res) => {
	const id = req.params.id;
	const updateParams = req.body;
	if (req.files.length > 0) {
		updateParams.imagesClient = [];
		updateParams.imagesServer = [];
		req.files.forEach((file) => {
			updateParams.imagesClient.push(`http://localhost:3100/public/services/${file.filename}`);
			updateParams.imagesServer.push(file.path);
		})
	}
	if (!id) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "ID not received",
		});
	}
	if (!validate(updateParams, "PATCH")) {
		if (updateParams.imagesServer) {
			updateParams.imagesServer.forEach(async (image) => {
				await fs.unlink(image);
			})
		}

		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Missing or incorrect data",
		});
	}
	try {
		if (updateParams.category) {
			const category1 = await Category.findById(updateParams.category);
			const category2 = await Category.findById('656df1c115cc52697e6b100f');
			updateParams.category = [category1, category2];
		}
		const updatedService = await Service.findByIdAndUpdate(id, { ...updateParams });

		if (updateParams.imagesServer) {
			updatedService.imagesServer.forEach(async (image) => {
				await fs.unlink(image);
			})
		}

		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Service updated successfully",
			service: updatedService,
		});
	} catch (e) {
		if (updateParams.imagesServer) {
			updateParams.imagesServer.forEach(async (image) => {
				await fs.unlink(image);
			})
		}
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not update service",
			details: e.message,
		});
	}
};

const DELETE = async (req, res) => {
	const id = req.params.id;
	
	try {
		const service = await Service.findByIdAndDelete(id);
		if (service.imagesServer) {
			service.imagesServer.forEach(async (image) => {
				await fs.unlink(image);
			})
		}
		return res.status(200).json({
			status: 200,
			type: "info",
			message: "Service deleted successfully",
			service: service,
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			type: "error",
			message: "Can not delete service",
			details: e.message,
		});
	}
};

export { CREATE, READ_ALL, READ_BY_ID, UPDATE, DELETE };