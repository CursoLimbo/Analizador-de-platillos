import mongoose, { Document,Model,Schema } from "mongoose";

interface IAdministrador {
    Nombre: string;
    Telefono: string;
    Correo: string;
    WhatsApp: string;
    Foto: string;
    CuentasBancarias: mongoose.Types.ObjectId[];
}


interface objDocument extends IAdministrador, Document {}

interface objModel extends Model<objDocument>{}


const AdministradorSchema : Schema = new Schema(
    {
        Nombre: { type: String, required: true },
        Telefono: { type: String, required: true },
        Correo: { type: String, required: true },
        WhatsApp: { type: String, required: true },
        Foto: { type: String, required: true },
        CuentasBancarias: [{ type: Schema.Types.ObjectId, ref: "CuentaBancaria" }],
      },
      { timestamps: true }
);

const Administrador = mongoose.model<objDocument,objModel>('Administrador',AdministradorSchema);
export {Administrador,IAdministrador};