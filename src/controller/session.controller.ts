import { Request, Response } from "express";
import sessionService from "../services/session.service";
import userService from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

class SessionController {
    async createUserSession(req: Request, res: Response) {
        const user = await userService.validatePassword(req.body);
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }
        const session = await sessionService.createSession(
            user._id,
            req.get("user-agent") || ""
        );
        const accessToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get<number>("accessTokenTtl") } // 15 min
        );
        const refreshToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get<number>("refreshTokenTtl") } // 1 year
        );
        return res.json({ accessToken, refreshToken });
    }

    async getUsersSessions(req: Request, res: Response) {
        const userId = res.locals.user._id;
        const sessions = await sessionService.getAllSessions({
            user: userId,
            valid: true,
        });
        return res.json({ sessions });
    }

    async deleteSession(req: Request, res: Response) {
        const sessionId = res.locals.user.session;
        await sessionService.updateSession(
            { _id: sessionId },
            { valid: false }
        );
        return res.json({
            accessToken: null,
            refreshToken: null,
        });
    }
}

export default new SessionController();
