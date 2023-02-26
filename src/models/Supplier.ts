import exp from "constants";
import mongoose,{Document,Model,Schema} from "mongoose";



interface ISupplier{
    name: string;
    location: string;
    phone: string;
}

interface objDocument extends ISupplier, Document {}

interface objModel extends Model<objDocument>{}

const SupplierSchema: Schema = new Schema(
    {
      nombre: { type: String, required: true },
      ubicacion: { type: String, required: true },
      telefono: { type: String, required: true },
    },
    { timestamps: true }
  );

  const Supplier = mongoose.model<objDocument,objDocument>('Supplier', SupplierSchema);

  export {Supplier,ISupplier};