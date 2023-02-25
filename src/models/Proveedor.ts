import exp from "constants";
import mongoose,{Document,Model,Schema} from "mongoose";



interface IProveedor{
    nombre: string;
    ubicacion: string;
    telefono: string;
}

interface objDocument extends IProveedor, Document {}

interface objModel extends Model<objDocument>{}

const ProveedorSchema: Schema = new Schema(
    {
      nombre: { type: String, required: true },
      ubicacion: { type: String, required: true },
      telefono: { type: String, required: true },
    },
    { timestamps: true }
  );

  const Proveedor = mongoose.model<objDocument,objDocument>('Proveedor',ProveedorSchema );

  export {Proveedor,IProveedor};