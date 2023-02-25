import mongoose, { Document,Model,Schema } from "mongoose";

interface ICuentaBancaria{
    Nombre: string;
    Correo: string;
    Telefono: string;
    Logo: string;
}

interface objDocument extends ICuentaBancaria, Document {}

interface objModel extends Model<objDocument>{}


const CuentaBancariaSchema: Schema = new Schema(
    {
        Nombre: { type: String, required: true },
        Correo: { type: String, required: true },
        Telefono: { type: String, required: true },
        Logo: { type: String, required: true },
      },
      { timestamps: true }
);


const CuentaBancaria = mongoose.model<objDocument,objModel>('CuentaBancaria',CuentaBancariaSchema);
export {CuentaBancaria,ICuentaBancaria};


