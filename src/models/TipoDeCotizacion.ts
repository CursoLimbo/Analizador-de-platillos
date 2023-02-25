import mongoose, { Document, Model, Schema } from "mongoose";

interface ITipoDeCotizacion {
    nombre: string;
    templateDeDesarrollo: string;
    terminosCondiciones: string;
    fecha: Date;
    precioTotal: number;
    codigo: string;
    cantPersonas: number;
    recetas: Array<mongoose.Types.ObjectId>;
    camposAdicionales: Array<mongoose.Types.ObjectId>;
}

interface objDocument extends ITipoDeCotizacion, Document {}

interface objModel extends Model<objDocument>{}

const TipoDeCotizacionSchema: Schema = new Schema(
    {
      nombre: { type: String, required: true },
      templateDeDesarrollo: { type: String, required: true },
      terminosCondiciones: { type: String, required: true },
      fecha: { type: Date, required: true },
      precioTotal: { type: Number, required: true },
      codigo: { type: String, required: true },
      cantPersonas: { type: Number, required: true },
      recetas: [{ type: Schema.Types.ObjectId, ref: 'Receta' }],
      camposAdicionales: [{ type: Schema.Types.ObjectId, ref: 'CampoAdicional' }],
    },
    { timestamps: true }
  );

  

  const TipoDeCotizacion = mongoose.model<objDocument,objModel>('TipoDeCotizacion',TipoDeCotizacionSchema);
  export {TipoDeCotizacion,ITipoDeCotizacion};