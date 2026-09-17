import { Schema, model, type HydratedDocument, type Model } from "mongoose";

export type UserRole = "USER" | "ADMIN";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type UserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;