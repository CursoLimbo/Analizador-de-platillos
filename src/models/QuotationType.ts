import mongoose, { Document, Model, Schema } from "mongoose";

interface IQuotationType {
    name: string;
    additionalSpots: Array<mongoose.Types.ObjectId>;
    contentTemplate: string;
    termsAndConditions: string;
    Date: Date;
    code: string;

}

interface objDocument extends IQuotationType, Document {}

interface objModel extends Model<objDocument>{}

const QuotationTypeSchema: Schema = new Schema(
    {
      name: { type: String, required: true },
      additionalSpots: [{ type: Schema.Types.ObjectId, ref: 'AdditionalSpot' }],
      contentTemplate: { type: String, required: true },
      termsAndConditions: { type: String, required: true },
      Date: { type: Date, required: true },
      code: { type: String, required: true },
    },
    { timestamps: true }
  );

  

  const QuotationType = mongoose.model<objDocument,objModel>('QuotationType',QuotationTypeSchema);
  export {QuotationType,IQuotationType};