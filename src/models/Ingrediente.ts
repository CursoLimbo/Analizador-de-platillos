import mongoose, { Document, Model, Schema } from "mongoose";

interface IIngrediente {
    nombre: string;
    presentacion: number;
    precioPorGramo: number;
    rendimiento: number;
    porcentajeDeRendimiento: number;
    precioMermado: number;
    productoMultiplicadoPorDos: number;
    idProveedor: mongoose.Types.ObjectId;
}

interface objDocument extends IIngrediente, Document {}

interface objModel extends Model<objDocument>{}

const IngredienteSchema : Schema = new Schema(  {
    nombre: { type: String, required: true },
    presentacion: { type: Number, required: true },
    precioPorGramo: { type: Number, required: true },
    rendimiento: { type: Number, required: true },
    porcentajeDeRendimiento: { type: Number, required: true },
    precioMermado: { type: Number, required: true },
    productoMultiplicadoPorDos: { type: Number, required: true },
    idProveedor: {
      type: mongoose.Types.ObjectId,
      ref: 'Proveedor',
      required: true,
    },
  },
  { timestamps: true }
);

const Ingrediente = mongoose.model<objDocument,objModel>('Ingrediente', IngredienteSchema);

export {Ingrediente,IIngrediente};