import { gql } from "apollo-boost";

export const getRecipeById = `
query GetRecipe($getRecipeId: String!) {
  getRecipe(id: $getRecipeId) {
    id
  }
}
`;

export const getAllRecipes = gql`
query GetAllRecipes {
  GetAllRecipes {
    id
    name
    procedure
    ingredients
    portions
    totalCostPerQuantity
  }
}
`;

export const createRecipeMutation = gql`
mutation Mutation($newRecipe: RecipeType!) {
  CreateRecipe(newRecipe: $newRecipe) {
    name
    quantity
    procedure
    ingredients
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

export const deleteRecipeMutation = gql`
mutation Mutation($deleteRecipeId: String!) {
  deleteRecipe(id: $deleteRecipeId)
}
`;
