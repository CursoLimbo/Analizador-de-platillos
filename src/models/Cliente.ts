import mongoose, { Document,Model,Schema } from "mongoose";

interface ICliente {
    Nombre: string;
    Ubicacion: string;
    Telefono: string;
    Whatsapp: string;
    Correo: string;
}

interface objDocument extends ICliente, Document {}

interface objModel extends Model<objDocument>{}

const ClienteSchema : Schema = new Schema(
    {
        Nombre: { type: String, required: true },
        Ubicacion: { type: String, required: true },
        Telefono: { type: String, required: true },
        Whatsapp: { type: String, required: true },
        Correo: { type: String, required: true },
      },
      { timestamps: true }
);

const Cliente = mongoose.model<objDocument,objModel>('Cliente',ClienteSchema);
export {Cliente,ICliente};