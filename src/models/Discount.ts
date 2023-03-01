import mongoose, { Document,Model,Schema } from "mongoose";

interface IDiscount {
    name: string;
    percentage: number;
    description: string;
}

interface objDocument extends IDiscount, Document {}

interface objModel extends Model<objDocument>{}

const DiscountSchema : Schema = new Schema({
    Nombre: { type: String, required: true },
    CantidadPorcentaje: { type: Number, required: true },
    Descripcion: { type: String, required: true },
  }
);

const Discount = mongoose.model<objDocument,objModel>('Discount',DiscountSchema);
export {Discount,IDiscount};