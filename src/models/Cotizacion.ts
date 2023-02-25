import mongoose, { Document,Model,Schema } from "mongoose";

interface ICotizacion {
    fecha: Date;
    codigo: string;
    Total: number;
    desarrollo: string;
    empresa:mongoose.Types.ObjectId;
    recetas: Array<mongoose.Types.ObjectId>;
    tipoDeCotizacion: mongoose.Types.ObjectId;
    cuentasBancarias: Array<mongoose.Types.ObjectId>;
    cliente: mongoose.Types.ObjectId;
    descuentos: Array<mongoose.Types.ObjectId>;
}

interface objDocument extends ICotizacion, Document {}

interface objModel extends Model<objDocument>{}

const CotizacionSchema: Schema = new Schema(
    {
        fecha: { type: Date, required: true },
        codigo: { type: String, required: true },
        total: { type: Number, required: true },
        desarrollo: { type: String, required: true },
        empresa: { type: Schema.Types.ObjectId, ref: 'Empresa', required: true },
        recetas: [{ type: Schema.Types.ObjectId, ref: 'Receta',required: true }],
        tipoDeCotizacion: { type: Schema.Types.ObjectId, ref: 'TipoDeCotizacion', required: true },
        cuentasBancarias: [{ type: Schema.Types.ObjectId, ref: 'CuentaBancaria' }],
        cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
        descuentos: [{ type: Schema.Types.ObjectId, ref: 'Descuento' }],
      },
      { timestamps: true }
);


const Cotizacion = mongoose.model<objDocument,objModel>('Cotizacion',CotizacionSchema);
export {Cotizacion,ICotizacion};