import Session from "../models/session.model";

class SessionService {
    async createSession(userId: string, userAgent: string) {
        try {
            const session = await Session.create({ user: userId, userAgent });

            return session.toJSON();
        } catch (e: any) {
            throw new Error(e);
        }
    }
}

export default new SessionService();
