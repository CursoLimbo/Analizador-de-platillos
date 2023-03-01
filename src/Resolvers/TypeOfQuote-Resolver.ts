import {Resolver, Mutation, Arg, Query} from "type-graphql";
import {TypeOfQuote, TypeOfQuoteModel} from "../models/TypeOfQuote";
import {TypeOfQuoteType} from "./Types/TypeOfQuote";

@Resolver((_of) => TypeOfQuote)
export class TypeOfQuoteResolver {
    @Query((_returns) => TypeOfQuote, {nullable:false, name: 'getTypeOfQuote'})
    async getTypeOfQuoteById(@Arg('id') id: string){
        return TypeOfQuoteModel.findById({_id: id});
    }

    @Query(()=> [TypeOfQuote], {name: 'GetAllTypeOfQuotes', description: 'Get List of TypeOfQuotes'})
    async getALlTypeOfQuotes(){
        return TypeOfQuoteModel.find();
    }

    @Mutation(() => TypeOfQuote, {name: 'CreateTypeOfQuote'})
    async createTypeOfQuote(@Arg('newTypeOfQuote'){name, additionalSpots, developmentTemplate, TermsConditions}: TypeOfQuoteType): Promise<TypeOfQuote>{
        const typeOfQuoteCreated = (
            await TypeOfQuoteModel.create({name, additionalSpots, developmentTemplate, TermsConditions})
        ).save();
        return typeOfQuoteCreated;
    }

    @Mutation(() => TypeOfQuote, {name: 'updateTypeOfQuote'})
    async updateTypeOfQuote (@Arg('updateTypeOfQuote'){id,name, additionalSpots, developmentTemplate, TermsConditions}: TypeOfQuoteType): Promise<TypeOfQuote>{
        const updatedTypeOfQuote = (
            await TypeOfQuoteModel.findByIdAndUpdate({_id:id},
                {
                    name, additionalSpots, developmentTemplate, TermsConditions
                }, {new: true}
            )
        );
        return updatedTypeOfQuote;
    }

    @Mutation(() => String, {name: 'deleteTypeOfQuote'})
    async  deleteTypeOfQuote(@Arg('id')id: string): Promise<String>{
        const result = await TypeOfQuoteModel.deleteOne({_id: id});

        if(result.deletedCount == 1) return id;
        else return ''
    }

}