import { nanoid } from 'nanoid';
import { Resolver, Mutation, Arg, Query, Authorized } from "type-graphql";
import { Quotation, QuotationModel } from "../models/Quotation";
import { QuotationType } from "./Types/Quotation";

@Resolver((_of) => Quotation)
export class QuotationResolver {
    @Authorized()
    @Query((_returns) => Quotation, { nullable: false, name: 'getQuotation' })
    async getQuotationById(@Arg('id') id: string) {
        return QuotationModel.findById({ _id: id });
    }

    @Authorized()
    @Query(() => [Quotation], { name: 'GetAllQuotations', description: 'Get List of Quotations' })
    async getAllQuotations() {
        return QuotationModel.find();
    }

    @Authorized()
    @Mutation(() => Quotation, { name: 'CreateQuotation' })
    async createQuotation(@Arg('newQuotation') { typeOfQuotation, client, date, code, recipes, total, bankAccounts, develop, discount, company, amountOfPeople }: QuotationType): Promise<Quotation> {
        const sid = nanoid(8);
        const quotationCreated = (
            await QuotationModel.create({ sid, typeOfQuotation, client, date, code, recipes, total, bankAccounts, develop, discount, company, amountOfPeople })
        ).save();
        return quotationCreated;
    }

    @Authorized()
    @Mutation(() => Quotation, { name: 'updateQuotation' })
    async updateQuotation(@Arg('updateQuotation') { id, typeOfQuotation, client, date, code, recipes, total, bankAccounts, develop, discount, company, amountOfPeople }: QuotationType): Promise<Quotation> {
        const updatedQuotation = (
            await QuotationModel.findByIdAndUpdate({ _id: id },
                {
                    typeOfQuotation, client, date, code, recipes, total, bankAccounts, develop, discount, company, amountOfPeople
                }, { new: true }
            )
        );
        return updatedQuotation;
    }

    @Authorized()
    @Mutation(() => String, { name: 'deleteQuotation' })
    async deleteQuotation(@Arg('id') id: string): Promise<String> {
        const result = await QuotationModel.deleteOne({ _id: id });

        if (result.deletedCount == 1) return id;
        else return ''
    }
}
