import { createUserSchema } from "./schema/user.schema";
import { Express, Request, Response } from "express";
import userController from "./controller/user.controller";
import validateResource from "./middleware/validateResource";

function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200);
    });
    app.post(
        "/api/users",
        validateResource(createUserSchema),
        userController.createUser
    );
}

export default routes;
