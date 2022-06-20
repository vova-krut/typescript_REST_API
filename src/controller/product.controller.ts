import {
    createProductInput,
    updateProductInput,
} from "../schema/product.schema";
import { Request, Response } from "express";
import productService from "../services/product.service";

class ProductController {
    async createProduct(
        req: Request<{}, {}, createProductInput["body"]>,
        res: Response
    ) {
        try {
            const userId = res.locals.user._id;
            const body = req.body;
            const product = await productService.createProduct({
                ...body,
                user: userId,
            });
            return res.json({ product });
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }

    async updateProduct(
        req: Request<updateProductInput["params"]>,
        res: Response
    ) {
        try {
            const userId = res.locals.user._id;
            const productId = req.params.productId;
            const update = req.body;
            const product = await productService.findProduct({ productId });
            if (!product) {
                return res.sendStatus(404);
            }
            if (String(product.user) !== userId) {
                return res.sendStatus(403);
            }
            const updatedProduct = await productService.findAndUpdateProduct(
                { productId },
                update,
                { new: true }
            );
            return res.json({ updatedProduct });
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }

    async getProduct(
        req: Request<updateProductInput["params"]>,
        res: Response
    ) {
        try {
            const productId = req.params.productId;
            const product = await productService.findProduct({ productId });
            if (!product) {
                return res.sendStatus(404);
            }
            return res.json({ product });
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }

    async deleteProduct(
        req: Request<updateProductInput["params"]>,
        res: Response
    ) {
        try {
            const userId = res.locals.user._id;
            const productId = req.params.productId;
            const product = await productService.findProduct({ productId });
            if (!product) {
                return res.sendStatus(404);
            }
            if (product.user !== userId) {
                return res.sendStatus(403);
            }
            await productService.deleteProduct({ productId });
            return res.sendStatus(200);
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }

    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await productService.getAllProducts();
            return res.json({ products });
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }
}

export default new ProductController();
