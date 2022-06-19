import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "../models/user.model";

class UserService {
    async createUser(
        input: DocumentDefinition<
            Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
        >
    ) {
        try {
            const user = await User.create(input);
            return omit(user.toJSON(), "password");
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async validatePassword({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        const user = await User.findOne({ email });
        if (!user) {
            return false;
        }
        const isValid = await user.comparePassword(password);
        if (!isValid) {
            return false;
        }
        return omit(user.toJSON(), "password");
    }
}

export default new UserService();
