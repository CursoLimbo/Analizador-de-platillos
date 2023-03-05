import {Resolver, Mutation, Arg, Query, ID} from "type-graphql";
import {Ingredient, IngredientModel} from "../models/Ingredient";
import {IngredientType} from "./Types/Ingredient";



@Resolver((_of) => Ingredient)
export class IngredientResolver {
    @Query((_returns) => Ingredient, {nullable:false, name: 'getIngredient'})
    async getIngredientById(@Arg('id') id: string){
        return IngredientModel.findById({_id: id});
    }

    @Query(()=> [Ingredient], {name: 'GetAllIngredients', description: 'Get List of Ingredients'})
    async getALlIngredients(){
        return IngredientModel.find();
    }

    @Mutation(() => Ingredient, {name: 'CreateIngredient'})
    async createIngredient(@Arg('newIngredient'){name, presentation, costPerGram, performance, supplier, performancePercentage, mermado, productMultiplyByTwo}: IngredientType): Promise<Ingredient>{
        const ingredientCreated = (
            await IngredientModel.create({name, presentation, costPerGram, performance, supplier, performancePercentage, mermado, productMultiplyByTwo})
        ).save();
        return ingredientCreated;
    }

    @Mutation(() => Ingredient, {name: 'updateIngredient'})
    async updateIngredient (@Arg('updateIngredient'){id, name, presentation, costPerGram, performance, supplier, performancePercentage, mermado, productMultiplyByTwo}: IngredientType): Promise<Ingredient>{
        const updatedIngredient = (
            await IngredientModel.findByIdAndUpdate({_id:id},
                {
                    name,  presentation, costPerGram, performance, supplier, performancePercentage, mermado, productMultiplyByTwo
                }, {new: true}
            )
        );
        return updatedIngredient;
    }

    @Mutation(() => String, {name: 'deleteIngredient'})
    async  deleteIngredient(@Arg('id')id: string): Promise<String>{
        const result = await IngredientModel.deleteOne({_id: id});

        if(result.deletedCount == 1) return id;
        else return ''
    }

}