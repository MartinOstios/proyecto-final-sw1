import jwt from 'jwt-simple'
import moment from 'moment';
import { secret } from "../services/jwt.js";
import User from "../models/User.js";



const auth = async (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).json({
			status: 403,
			type: "error",
			message: "Couldn't find authorization header"
		});
	}

	const token = req.headers.authorization.replace(/['"]+/g, '').split(" ")[1];
	try {
		const payload = jwt.decode(token, secret);
		console.log(payload);
		if (payload.exp <= moment().unix()) {
			return res.status(404).json({
				status: 404,
				type: "error",
				message: "Token expired"
			});
		}
		const user = await User.findById(payload.id);
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		req.user = { ...user };
		req.body.payload = payload
		next()
	}
	catch (e) {
		return res.status(404).json({
			status: 404,
			type: "error",
			message: "Token is not valid",
			e
		});
	}
}


export default auth;