import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "../models/user.model";

class UserService {
    async createUser(
        input: DocumentDefinition<
            Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
        >
    ) {
        try {
            return await User.create(input);
        } catch (e: any) {
            throw new Error(e);
        }
    }
}

export default new UserService();
