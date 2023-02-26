import mongoose, { Document, Model, Schema } from "mongoose";

interface IAdditionalSpot {
    name: string;
    value : string;
}

interface objDocument extends IAdditionalSpot, Document {}

interface objModel extends Model<objDocument>{}

const AdditionalSpotSchema : Schema = new Schema(
    {
        name: { type: String, required: true },
        value: { type: String, required: true },
    },
    { timestamps: true }
);

const AdditionalSpot = mongoose.model<objDocument,objModel>('AdditionalSpot', AdditionalSpotSchema);
export {AdditionalSpot, IAdditionalSpot};
