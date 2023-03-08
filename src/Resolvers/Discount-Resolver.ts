import {Resolver, Mutation, Arg, Query, ID} from "type-graphql";
import {Discount, DiscountModel} from "../models/Discount";
import {DiscountType} from "./Types/Discount";


@Resolver((_of) => Discount)
export class DiscountResolver {
    @Query((_returns) => Discount, {nullable:false, name: 'getDiscountById'})
    async getDiscountById(@Arg('id') id: string){
        return DiscountModel.findById({_id: id});
    }

    @Query(()=> [Discount], {name: 'GetAllDiscounts', description: 'Get List of discounts'})
    async getAllDiscounts(){
        return DiscountModel.find();
    }

    @Mutation(() => Discount, {name: 'CreateDiscount'})
    async createDiscount(@Arg('newDiscount'){name, percentage, description}: DiscountType): Promise<Discount>{
        const discountCreated = (
            await DiscountModel.create({name, percentage, description})
        ).save();
        return discountCreated;
    }

    @Mutation(() => Discount, {name: 'updateDiscount'})
    async updateDiscount (@Arg('updateDiscount'){id, name,  percentage, description}: DiscountType): Promise<Discount>{
        const updatedDiscount = (
            await DiscountModel.findByIdAndUpdate({_id:id},
                {
                    name,  percentage, description
                }, {new: true}
            )
        );
        return updatedDiscount;
    }

    @Mutation(() => String, {name: 'deleteDiscount'})
    async  deleteDiscount(@Arg('id')id: string): Promise<String>{
        const result = await DiscountModel.deleteOne({_id: id});

        if(result.deletedCount == 1) return id;
        else return ''
    }

}