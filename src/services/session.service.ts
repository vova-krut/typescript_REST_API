import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model";
import { verifyJwt, signJwt } from "../utils/jwt.utils";
import userService from "./user.service";
import config from "config";

class SessionService {
    async createSession(userId: string, userAgent: string) {
        try {
            const session = await Session.create({ user: userId, userAgent });

            return session.toJSON();
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async getAllSessions(query: FilterQuery<SessionDocument>) {
        return Session.find(query).lean();
    }

    async updateSession(
        query: FilterQuery<SessionDocument>,
        update: UpdateQuery<SessionDocument>
    ) {
        return Session.updateOne(query, update);
    }

    async reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
        const { decoded } = verifyJwt(refreshToken);
        if (!decoded || !get(decoded, "session")) return false;

        const session = await Session.findById(get(decoded, "session"));
        if (!session || !session.valid) return false;

        const user = await userService.findUser({ _id: session.user });
        if (!user) return false;

        const accessToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get<number>("accessTokenTtl") } // 15 min
        );

        return accessToken;
    }
}

export default new SessionService();
