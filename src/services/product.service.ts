import {
    DocumentDefinition,
    FilterQuery,
    QueryOptions,
    UpdateQuery,
} from "mongoose";
import Product, { ProductDocument } from "../models/product.model";

class ProductService {
    async createProduct(
        input: DocumentDefinition<
            Omit<ProductDocument, "createdAt" | "updatedAt">
        >
    ) {
        return Product.create(input);
    }

    async findProduct(
        query: FilterQuery<ProductDocument>,
        options: QueryOptions = { lean: true }
    ) {
        return Product.findOne(query, {}, options);
    }

    async findAndUpdateProduct(
        query: FilterQuery<ProductDocument>,
        update: UpdateQuery<ProductDocument>,
        options: QueryOptions
    ) {
        return Product.findOneAndUpdate(query, update, options);
    }

    async deleteProduct(query: FilterQuery<ProductDocument>) {
        return Product.deleteOne(query);
    }

    async getAllProducts() {
        return Product.find();
    }
}

export default new ProductService();
