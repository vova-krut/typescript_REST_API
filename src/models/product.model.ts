import { UserDocument } from "./user.model";
import mongoose from "mongoose";
import * as uuid from "uuid";

export interface ProductDocument extends mongoose.Document {
    user: UserDocument["_id"];
    title: string;
    description: string;
    price: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true,
            default: () => `product_${uuid.v4()}`,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model<ProductDocument>("Product", productSchema);

export default Product;
