import mongoose, { Document,Model,Schema } from "mongoose";


interface IEmpresa {
    Nombre: string;
    Correo: string;
    Telefono: string;
    Logo: string;
}

interface objDocument extends IEmpresa, Document {}

interface objModel extends Model<objDocument>{}


const EmpresaSchema : Schema = new Schema({
    Nombre: { type: String, required: true },
    Correo: { type: String, required: true },
    Telefono: { type: String, required: true },
    Logo: { type: String, required: true },
    },
    { timestamps: true }
);

const Empresa = mongoose.model<objDocument,objModel>('Empresa',EmpresaSchema);
export {Empresa,IEmpresa};