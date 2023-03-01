import mongoose, { Document,Model,Schema } from "mongoose";

interface IClient {
    name: string;
    location: string;
    phone: string;
    whatsapp: string;
    email: string;
}

interface objDocument extends IClient, Document {}

interface objModel extends Model<objDocument>{}

const ClientSchema : Schema = new Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        phone: { type: String, required: true },
        whatsapp: { type: String, required: true },
        email: { type: String, required: true },
      },
      { timestamps: true }
);

const Client = mongoose.model<objDocument,objModel>('Client',ClientSchema);
export {Client,IClient};