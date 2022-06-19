import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import sessionService from "../services/session.service";
import { verifyJwt } from "../utils/jwt.utils";

export const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );
    if (!accessToken) {
        return next();
    }
    const { decoded, expired } = verifyJwt(accessToken);
    const refreshToken = get(req, "headers.x-refresh", "");
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    if (expired && refreshToken) {
        const newAccessToken = await sessionService.reIssueAccessToken({
            refreshToken,
        });

        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
            const result = verifyJwt(newAccessToken);
            res.locals.user = result.decoded;
        }

        return next();
    }
    return next();
};
