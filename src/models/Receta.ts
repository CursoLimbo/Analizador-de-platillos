import mongoose, { Document, Model, Schema } from "mongoose";

interface IReceta {
    nombre: string;
    procedimiento: string;
    costoTotalPorCantidad: number;
    porcentajeInflacion: number;
    impuestoDeVenta: number;
    impuestoDeServicio: number;
    utilidades: number;
    ganancia: number;
    costoUnitario: number;
    costoTotal: number;
    ingredientes: mongoose.Types.ObjectId[];
}

interface objDocument extends IReceta, Document {}

interface objModel extends Model<objDocument>{}


const RecetaSchema : Schema = new Schema(  {
    nombre: { type: String, required: true },
    procedimiento: { type: String, required: true },
    costoTotalPorCantidad: { type: Number, required: true },
    porcentajeInflacion: { type: Number, required: true },
    impuestoDeVenta: { type: Number, required: true },
    impuestoDeServicio: { type: Number, required: true },
    utilidades: { type: Number, required: true },
    ganancia: { type: Number, required: true },
    costoUnitario: { type: Number, required: true },
    costoTotal: { type: Number, required: true },
    ingredientes: [{ type: mongoose.Types.ObjectId, ref: 'Ingrediente' }],
    },
    { timestamps: true }
  );

  const Receta = mongoose.model<objDocument,objModel>('Receta',RecetaSchema);
  export {Receta,IReceta};