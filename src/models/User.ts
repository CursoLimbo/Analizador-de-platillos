import mongoose, { Document,Model,Schema } from "mongoose";

interface IUser {
    name: string;
    phone: string;
    email: string;
    whatsApp: string;
    photo: string;
    bankAccounts: mongoose.Types.ObjectId[];
}


interface objDocument extends IUser, Document {}

interface objModel extends Model<objDocument>{}


const UserSchema : Schema = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        whatsApp: { type: String, required: true },
        photo: { type: String, required: true },
        bankAccounts: [{ type: Schema.Types.ObjectId, ref: "CuentaBancaria" }],
      },
      { timestamps: true }
);

const User = mongoose.model<objDocument,objModel>('User',UserSchema);
export {User,IUser};