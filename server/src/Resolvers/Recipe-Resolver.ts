import { Resolver, Mutation, Arg, Query, Authorized } from "type-graphql";
import { Recipe, RecipeModel } from "../models/Recipe";
import { RecipeType } from "./Types/Recipe";
import { IngredientRecipeType } from "./Types/Recipe"; // Ensure this import

@Resolver(_of => Recipe)
export class RecipeResolver {
    @Authorized()
    @Query(_returns => Recipe, { nullable: false, name: 'getRecipe' })
    async getRecipeById(@Arg('id') id: string) {
        return RecipeModel.findById(id);
    }

    @Authorized()
    @Query(_returns => [Recipe], { name: 'GetAllRecipes', description: 'Get List of Recipes' })
    async getALlRecipes() {
        return RecipeModel.find();
    }

    @Authorized()
    @Mutation(_returns => Recipe, { name: 'CreateRecipe' })
    async createRecipe(@Arg('newRecipe') newRecipe: RecipeType): Promise<Recipe> {
        const ingredients = newRecipe.ingredients.map(ingredient => {
            const newIngredient = new IngredientRecipeType();
            newIngredient.idIngredient = ingredient.idIngredient;
            newIngredient.nameIngredient = ingredient.nameIngredient;
            newIngredient.quantity = ingredient.quantity;
            return newIngredient;
        });

        const recipe = new RecipeModel({
            ...newRecipe,
            ingredients,
        });

        return recipe.save();
    }

    @Authorized()
    @Mutation(_returns => Recipe, { name: 'updateRecipe' })
    async updateRecipe(@Arg('updateQuotation') updateQuotation: RecipeType): Promise<Recipe> {
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(
            updateQuotation.id,
            {
                ...updateQuotation,
                ingredients: updateQuotation.ingredients.map(ingredient => ({ ...ingredient })),
            },
            { new: true }
        );
        return updatedRecipe;
    }

    @Authorized()
    @Mutation(_returns => String, { name: 'deleteRecipe' })
    async deleteRecipe(@Arg('id') id: string): Promise<string> {
        const result = await RecipeModel.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            return id;
        } else {
            return '';
        }
    }
}
