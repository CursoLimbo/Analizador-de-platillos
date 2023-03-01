import mongoose, { Document,Model,Schema } from "mongoose";

interface IBankAccount{
    bank: string;
    accountNumber: string;
    owner: mongoose.Types.ObjectId;
}

interface objDocument extends IBankAccount, Document {}

interface objModel extends Model<objDocument>{}


const BankAccountSchema: Schema = new Schema(
    {
        bank: { type: String, required: true },
        accountNumber: { type: String, required: true },
        owner: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
      },
      { timestamps: true }
);


const BankAccount = mongoose.model<objDocument,objModel>('BankAccount',BankAccountSchema);
export {BankAccount,IBankAccount};


