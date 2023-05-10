import { gql } from "apollo-boost";

export const getRecipeById = `
query GetRecipe($getRecipeId: String!) {
  getRecipe(id: $getRecipeId) {
    id
  }
}
`;

export const getAllRecipes = `
query GetAllRecipes {
  GetAllRecipes {
    id
  }
}
`;

export const createRecipeMutation = `
mutation CreateRecipe($newRecipe: RecipeType!) {
  CreateRecipe(newRecipe: $newRecipe) {
    id
  }
}
`;

export const updateRecipeMutation = `
mutation UpdateRecipe($updateRecipe: RecipeType!) {
  updateRecipe(updateRecipe: $updateRecipe) {
    id
  }
}
`;

export const deleteRecipeMutation = `
mutation DeleteRecipe($deleteRecipeId: String!) {
  deleteRecipe(id: $deleteRecipeId)
}
`;
