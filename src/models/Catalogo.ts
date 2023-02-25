import mongoose, { Document, Model, Schema } from "mongoose";

interface ICatalogo {
    nombre: string;
    fecha: Date;
    archivo : String;
}

interface objDocument extends ICatalogo, Document {}

interface objModel extends Model<objDocument>{}

const CatalogoSchema : Schema = new Schema({
    nombre: { type: String, required: true },
    fecha: {type: Date, default: Date.now},
    archivo : {type: String, required: true}
    },
    {timestamps: true}
);

const Catalogo = mongoose.model<objDocument,objModel>('Catalogo',CatalogoSchema);

export {Catalogo,ICatalogo};