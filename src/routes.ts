import { requireUser } from "./middleware/requireUser";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { Express, Request, Response } from "express";
import userController from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import sessionController from "./controller/session.controller";

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
}

export default routes;
