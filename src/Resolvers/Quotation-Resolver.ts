import {Resolver, Mutation, Arg, Query} from "type-graphql";
import {Quotation, QuotationModel} from "../models/Quotation";
import {QuotationType} from "./Types/Quotation";



@Resolver((_of) => Quotation)
export class QuotationResolver {
    @Query((_returns) => Quotation, {nullable:false, name: 'getQuotation'})
    async getQuotationById(@Arg('id') id: string){
        return QuotationModel.findById({_id: id});
    }

    @Query(()=> [Quotation], {name: 'GetAllQuotations', description: 'Get List of Quotations'})
    async getALlQuotations(){
        return QuotationModel.find();
    }

    @Mutation(() => Quotation, {name: 'CreateQuotation'})
    async createQuotation(@Arg('newQuotation'){typeOfQuotation, client, date, code, recipes, total, bankAccounts, develop, discount, company, amountOfPeople}: QuotationType): Promise<Quotation>{
        const quotationCreated = (
            await QuotationModel.create({typeOfQuotation, client, date, code, recipes, total, bankAccounts, develop, discount, company, amountOfPeople})
        ).save();
        return quotationCreated;
    }

    @Mutation(() => Quotation, {name: 'updateQuotation'})
    async updateQuotation (@Arg('updateQuotation'){id,typeOfQuotation, client, date, code, recipes, total, bankAccounts, develop, discount, company, amountOfPeople}:QuotationType): Promise<Quotation>{
        const updatedQuotation = (
            await QuotationModel.findByIdAndUpdate({_id:id},
                {
                    typeOfQuotation, client, date, code, recipes, total, bankAccounts, develop, discount, company, amountOfPeople
                }, {new: true}
            )
        );
        return updatedQuotation;
    }

    @Mutation(() => String, {name: 'deleteQuotation'})
    async  deleteQuotation(@Arg('id')id: string): Promise<String>{
        const result = await QuotationModel.deleteOne({_id: id});

        if(result.deletedCount == 1) return id;
        else return ''
    }

}