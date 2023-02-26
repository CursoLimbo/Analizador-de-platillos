import mongoose, { Document, Model, Schema } from "mongoose";

interface IRecipe {
    name: string;
    preparation: string;
    costTotalPerQuantity: number;
    percentageInflation: number;
    salesTax: number;
    serviceTax: number;
    utilities: number;
    revenue: number;
    unitCost: number;
    totalCost: number;
    ingredients: mongoose.Types.ObjectId[];
}

interface objDocument extends IRecipe, Document {}

interface objModel extends Model<objDocument>{}


const RecipeSchema : Schema = new Schema(  {
    name: { type: String, required: true },
    preparation: { type: String, required: true },
    costTotalPerQuantity: { type: Number, required: true },
    percentageInflation: { type: Number, required: true },
    salesTax: { type: Number, required: true },
    serviceTax: { type: Number, required: true },
    utilities: { type: Number, required: true },
    revenue: { type: Number, required: true },
    unitCost: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    ingredients: [{ type: mongoose.Types.ObjectId, ref: 'Ingredient' }],
    },
    { timestamps: true }
  );

  const Recipe = mongoose.model<objDocument,objModel>('Recipe',RecipeSchema);
  export {Recipe,IRecipe};