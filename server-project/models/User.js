import { Schema, model } from "mongoose"
import Role from "./Role.js"
import Address from "./Address.js";

const UserSchema = Schema({
	name: String,
	lastname: String,
	email: {
		type: String,
		unique: true,
	},
	password: String,
	active: {
		type: Boolean,
		default: false,
	},
	avatarClient: {
		type: String,
		default: "http://localhost:3100/public/default.png",
	},
	avatarServer: {
		type: String,
		default: "uploads/avatar/default.png",
	},
	address: {
		type: Schema.Types.ObjectId, 
		ref: Address,
		default: null,
	},
	role: {
		type: Schema.Types.ObjectId,
		ref: Role,
		default: "656b99e3fdbe12763c8f7af9",
	},
});
export default model("User", UserSchema, "users");