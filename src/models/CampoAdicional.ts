import mongoose, { Document, Model, Schema } from "mongoose";

interface ICampoAdicional {
    nombre: string;
    valor : string;
}

interface objDocument extends ICampoAdicional, Document {}

interface objModel extends Model<objDocument>{}

const CampoAdicionalSchema : Schema = new Schema(
    {
        nombre: { type: String, required: true },
        valor: { type: String, required: true },
    },
    { timestamps: true }
);

const CampoAdicional = mongoose.model<objDocument,objModel>('CampoAdicional',CampoAdicionalSchema);
export {CampoAdicional,ICampoAdicional};