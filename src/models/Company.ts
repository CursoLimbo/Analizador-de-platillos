import mongoose, { Document,Model,Schema } from "mongoose";


interface ICompany {
    name: string;
    email: string;
    phone: string;
    logo: string;
}

interface objDocument extends ICompany, Document {}

interface objModel extends Model<objDocument>{}


const CompanySchema : Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    logo: { type: String, required: true },
    },
    { timestamps: true }
);

const Company = mongoose.model<objDocument,objModel>('Company',CompanySchema);
export {Company,ICompany};