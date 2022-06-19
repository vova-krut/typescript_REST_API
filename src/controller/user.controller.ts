import { CreateUserInput } from "./../schema/user.schema";
import { omit } from "lodash";
import { Request, Response } from "express";
import userService from "../services/user.service";
import logger from "../utils/logger";

class UserController {
    async createUser(
        req: Request<{}, {}, CreateUserInput["body"]>,
        res: Response
    ) {
        try {
            const user = await userService.createUser(req.body);
            return res.json(omit(user.toJSON(), "password"));
        } catch (e: any) {
            logger.error(e);
            return res.status(409).send(e.message);
        }
    }
}

export default new UserController();
