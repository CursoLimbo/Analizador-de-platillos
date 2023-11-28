import { gql } from "apollo-boost";

export const getRecipeById = gql`
query GetRecipe($getRecipeId: String!) {
  getRecipe(id: $getRecipeId) {
    id
    name
    portions
    procedure
    ingredients {
      idIngredient
      nameIngredient
      quantity
    }
    PercentageInflation
    revenue
    salesTax
    serviceTax
    totalCostPerQuantity
    unitCost
    utilities
    version
  }
}
`;

export const getAllRecipes = gql`
query GetAllQuotations {
  GetAllRecipes {
    PercentageInflation
    id
    ingredients {
      idIngredient
      nameIngredient
      quantity
    }
    name
    portions
    procedure
    revenue
    salesTax
    serviceTax
    totalCostPerQuantity
    totalCostRawMaterial
    unitCost
    utilities
    version
  }
}
`;

export const createRecipeMutation = gql`
mutation Mutation($newRecipe: RecipeType!) {
  CreateRecipe(newRecipe: $newRecipe) {
    id
    ingredients {
      idIngredient
      nameIngredient
      quantity
    }
    name
    portions
    procedure
    version
  }
}
`;

export const updateRecipeMutation = gql`
mutation Mutation($updateRecipe: RecipeType!) {
  updateRecipe(updateRecipe: $updateRecipe) {
    id
    name
    portions
    procedure
    version
    ingredients {
      idIngredient
      nameIngredient
      quantity
    }
  }
}
`;

export const deleteRecipeMutation = gql`
mutation Mutation($deleteRecipeId: String!) {
  deleteRecipe(id: $deleteRecipeId)
}
`;
