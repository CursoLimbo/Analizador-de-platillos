import { nanoid } from 'nanoid';
import { Resolver, Mutation, Arg, Query, Authorized } from "type-graphql";
import { Ingredient, IngredientModel } from "../models/Ingredient";
import { IngredientType } from "./Types/Ingredient";

@Resolver((_of) => Ingredient)
export class IngredientResolver {
    @Authorized()
    @Query((_returns) => Ingredient, { nullable: false, name: 'getIngredient' })
    async getIngredientById(@Arg('id') id: string) {
        return IngredientModel.findById({ _id: id });
    }

    @Authorized()
    @Query(() => [Ingredient], { name: 'GetAllIngredients', description: 'Get List of Ingredients' })
    async getAllIngredients() {
        return IngredientModel.find();
    }

    @Authorized()
    @Mutation(() => Ingredient, { name: 'CreateIngredient' })
    async createIngredient(@Arg('newIngredient') { name, brand, unit, presentation, cost, costPerGram, performance, supplier, performancePercentage, mermado }: IngredientType): Promise<Ingredient> {
        const sid = nanoid(8);
        const ingredientCreated = (
            await IngredientModel.create({ sid, name, brand, unit, presentation, cost, costPerGram, performance, supplier, performancePercentage, mermado })
        ).save();
        return ingredientCreated;
    }

    @Authorized()
    @Mutation(() => Ingredient, { name: 'updateIngredient' })
    async updateIngredient(@Arg('updateIngredient') { id, name, brand, unit, presentation, cost, costPerGram, performance, supplier, performancePercentage, mermado }: IngredientType): Promise<Ingredient> {
        const updatedIngredient = (
            await IngredientModel.findByIdAndUpdate({ _id: id },
                {
                    name, brand, unit, presentation, cost, costPerGram, performance, supplier, performancePercentage, mermado
                }, { new: true }
            )
        );
        return updatedIngredient;
    }

    @Authorized()
    @Mutation(() => String, { name: 'deleteIngredient' })
    async deleteIngredient(@Arg('id') id: string): Promise<String> {
        const result = await IngredientModel.deleteOne({ _id: id });

        if (result.deletedCount == 1) return id;
        else return ''
    }
}
