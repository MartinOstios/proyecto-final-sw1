import { Schema, model } from "mongoose";
import Category from "./Category.js";
import Provider from "./Provider.js";

const ServiceSchema = Schema(
    {
        name: String,
        category: [{
            type: Schema.Types.ObjectId,
            ref: Category,
            default: undefined
        }],
        provider: {
            type: Schema.Types.ObjectId,
            ref: Provider,
            default: undefined
        },
        imagesClient: [],
        imagesServer: [],
        description: String,
        active: {
			type: Boolean,
			default: false
		},
        status: {
            type: Boolean,
            default: false
        }
    }
);

export default model("Service",ServiceSchema,"services");