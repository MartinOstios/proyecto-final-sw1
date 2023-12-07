import { Schema, model } from "mongoose";
import Address from "./Address.js";

const ProviderSchema = Schema(
    {
        name: String,
        avatar: {
			type: String,
			default: "uploads/avatar/default.png",
		},
        active: {
            type: Boolean,
            default: false
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: Address,
            default: undefined
        },
        avatarClient: {
            type: String,
            default: "http://localhost:3100/public/default.png",
        },
        avatarServer: {
            type: String,
            default: "uploads/avatar/default.png",
        },
    }
);

export default model("Provider",ProviderSchema,"providers");