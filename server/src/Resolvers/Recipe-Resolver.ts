import {Resolver, Mutation, Arg, Query, Authorized} from "type-graphql";
import {Recipe, RecipeModel} from "../models/Recipe";
import {RecipeType} from "./Types/Recipe";


@Resolver((_of) => Recipe)
export class RecipeResolver {
    @Authorized()
    @Query((_returns) => Recipe, {nullable:false, name: 'getRecipe'})
    async getRecipeById(@Arg('id') id: string){
        return RecipeModel.findById({_id: id});
    }

    @Authorized()
    @Query(()=> [Recipe], {name: 'GetAllRecipes', description: 'Get List of Recipes'})
    async getALlRecipes(){
        return RecipeModel.find();
    }

    @Authorized()
    @Mutation(() => Recipe, {name: 'CreateRecipe'})
    async createRecipe(@Arg('newRecipe'){name, ingredients, procedure, quantity, totalCostPerQuantity, PercentageInflation, salesTax, serviceTax, utilities, revenue, unitCost}: RecipeType): Promise<Recipe>{
        const recipeCreated = (
            await RecipeModel.create({name, ingredients, procedure, quantity, totalCostPerQuantity, PercentageInflation, salesTax, serviceTax, utilities, revenue, unitCost})
        ).save();
        return recipeCreated;
    }

    @Authorized()
    @Mutation(() => Recipe, {name: 'updateRecipe'})
    async updateRecipe (@Arg('updateQuotation'){id,name, ingredients, procedure, quantity, totalCostPerQuantity, PercentageInflation, salesTax, serviceTax, utilities, revenue, unitCost}: RecipeType): Promise<Recipe>{
        const updatedRecipe = (
            await RecipeModel.findByIdAndUpdate({_id:id},
                {
                    name, ingredients, procedure, quantity, totalCostPerQuantity, PercentageInflation, salesTax, serviceTax, utilities, revenue, unitCost
                }, {new: true}
            )
        );
        return updatedRecipe;
    }

    @Authorized()
    @Mutation(() => String, {name: 'deleteRecipe'})
    async  deleteRecipe(@Arg('id')id: string): Promise<String>{
        const result = await RecipeModel.deleteOne({_id: id});

        if(result.deletedCount == 1) return id;
        else return ''
    }

}