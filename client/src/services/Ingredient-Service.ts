import { gql } from "apollo-boost";

export const getIngredientById = gql`
query GetIngredient($getIngredientId: String!) {
  getIngredient(id: $getIngredientId) {
    id
    costPerGram
    mermado
    name
    performance
    performancePercentage
    presentation
    productMultiplyByTwo
    supplier
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

export const updateIngredientMutation = gql`
  mutation UpdateIngredient($updateIngredient: IngredientType!) {
    updateIngredient(updateIngredient: $updateIngredient) {
      id
    }
  }
`;

export const deleteIngredientMutation = gql`
  mutation Mutation($deleteIngredientId: String!) {
    deleteIngredient(id: $deleteIngredientId)
  }
`;
