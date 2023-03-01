import mongoose, { Document,Model,Schema } from "mongoose";

interface IQuotation {
    date: Date;
    code: string;
    total: number;
    content: string;
    company:mongoose.Types.ObjectId;
    recipes: Array<mongoose.Types.ObjectId>;
    quotationType: mongoose.Types.ObjectId;
    bankAccounts: Array<mongoose.Types.ObjectId>;
    client: mongoose.Types.ObjectId;
    discounts: Array<mongoose.Types.ObjectId>;
}

interface objDocument extends IQuotation, Document {}

interface objModel extends Model<objDocument>{}

const QuotationSchema: Schema = new Schema(
    {
        date: { type: Date, required: true },
        code: { type: String, required: true },
        total: { type: Number, required: true },
        content: { type: String, required: true },
        company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
        recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe',required: true }],
        quotationType: { type: Schema.Types.ObjectId, ref: 'QuotationType', required: true },
        bankAccounts: [{ type: Schema.Types.ObjectId, ref: 'BankAccount' }],
        client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
        discount: [{ type: Schema.Types.ObjectId, ref: 'Discount' }],
      },
      { timestamps: true }
);


const Quotation = mongoose.model<objDocument,objModel>('Quotation', QuotationSchema);
export {Quotation,IQuotation};