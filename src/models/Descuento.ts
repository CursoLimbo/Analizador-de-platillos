import mongoose, { Document,Model,Schema } from "mongoose";

interface IDescuento {
    Nombre: string;
    CantidadPorcentaje: number;
    Descripcion: string;
}

interface objDocument extends IDescuento, Document {}

interface objModel extends Model<objDocument>{}

const DescuentoSchema : Schema = new Schema({
    Nombre: { type: String, required: true },
    CantidadPorcentaje: { type: Number, required: true },
    Descripcion: { type: String, required: true },
  }
);

const Descuento = mongoose.model<objDocument,objModel>('Descuento',DescuentoSchema);
export {Descuento,IDescuento};