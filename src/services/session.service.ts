import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model";

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
}

export default new SessionService();
