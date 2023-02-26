import mongoose, { Document, Model, Schema } from "mongoose";

interface IIngredient {
    name: string;
    presentation: number;
    pricePerGram: number;
    yield: number;
    percentageOfYield: number;
    priceDecreased: number;// precio mermado
    productMultipliedByTwo: number;
    supplier: mongoose.Types.ObjectId;
}

interface objDocument extends IIngredient, Document {}

interface objModel extends Model<objDocument>{}

const IngredientSchema : Schema = new Schema(  {
    name: { type: String, required: true },
    presentation: { type: Number, required: true },
    pricePerGram: { type: Number, required: true },
    yield: { type: Number, required: true },
    percentageOfYield: { type: Number, required: true },
    priceDecreased: { type: Number, required: true },
    productMultipliedByTwo: { type: Number, required: true },
    supplier: {type: mongoose.Types.ObjectId, ref: 'Supplier', required: false,
    },
  },
  { timestamps: true }
);

const Ingredient = mongoose.model<objDocument,objModel>('Ingredient', IngredientSchema);

export {Ingredient,IIngredient};