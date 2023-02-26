import mongoose, { Document, Model, Schema } from "mongoose";

interface ICatalogue {
    name: string;
    date: Date;
    file : String;
}

interface objDocument extends ICatalogue, Document {}

interface objModel extends Model<objDocument>{}

const CatalogueSchema : Schema = new Schema({
    name: { type: String, required: true },
    date: {type: Date, default: Date.now},
    file : {type: String, required: true}
    },
    {timestamps: true}
);

const Catalogue = mongoose.model<objDocument,objModel>('Catalogue',CatalogueSchema);

export {Catalogue,ICatalogue};