import {
    createProductSchema,
    updateProductSchema,
    getProductSchema,
    deleteProductSchema,
} from "./schema/product.schema";
import { requireUser } from "./middleware/requireUser";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { Express, Request, Response } from "express";
import userController from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import sessionController from "./controller/session.controller";
import productController from "./controller/product.controller";

function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.post(
        "/api/users",
        validateResource(createUserSchema),
        userController.createUser
    );

    app.post(
        "/api/sessions",
        validateResource(createSessionSchema),
        sessionController.createUserSession
    );
    app.get("/api/sessions", requireUser, sessionController.getUsersSessions);
    app.delete("/api/sessions", requireUser, sessionController.deleteSession);

    app.post(
        "/api/products",
        [requireUser, validateResource(createProductSchema)],
        productController.createProduct
    );
    app.put(
        "/api/products/:productId",
        [requireUser, validateResource(updateProductSchema)],
        productController.updateProduct
    );
    app.get(
        "/api/products/:productId",
        validateResource(getProductSchema),
        productController.updateProduct
    );
    app.get("/api/products", productController.getAllProducts);
    app.delete(
        "/api/products/:productId",
        [requireUser, validateResource(deleteProductSchema)],
        productController.updateProduct
    );
}

export default routes;
