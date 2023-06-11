import { gql } from "apollo-boost";

export const getIngredientById = `
  query GetIngredientById($id: String!) {
    getIngredient(id: $id) {
      id
    }
  }
`;

export const getAllIngredients = gql`
query GetAllIngredients {
  GetAllIngredients {
    supplier
    productMultiplyByTwo
    presentation
    performancePercentage
    performance
    name
    mermado
    id
    costPerGram
  }
}
`;

export const createIngredientMutation = gql`
  mutation Mutation($newIngredient: IngredientType!) {
    CreateIngredient(newIngredient: $newIngredient) {
      supplier
      productMultiplyByTwo
      presentation
      performancePercentage
      performance
      name
      mermado
      costPerGram
    }
  }
`;

export const updateIngredientMutation = `
  mutation UpdateIngredient($updateIngredient: IngredientType!) {
    updateIngredient(updateIngredient: $updateIngredient) {
      id
    }
  }
`;

export const deleteIngredientMutation = `
  mutation DeleteIngredient($id: String!) {
    deleteIngredient(id: $id)
  }
`;
