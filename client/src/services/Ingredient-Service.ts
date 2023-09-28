import { gql } from "apollo-boost";

export const getIngredientById = gql`
query GetIngredient($getIngredientId: String!) {
  getIngredient(id: $getIngredientId) {
    brand
    cost
    costPerGram
    mermado
    name
    performance
    performancePercentage
    presentation
    supplier
    unit
    id
  }
}
`;

export const getAllIngredients = gql`
query GetAllIngredients {
  GetAllIngredients {
    brand
    cost
    costPerGram
    mermado
    name
    performance
    performancePercentage
    presentation
    supplier
    unit
    id
  }
}
`;

export const createIngredientMutation = gql`
  mutation Mutation($newIngredient: IngredientType!) {
    CreateIngredient(newIngredient: $newIngredient) {
      brand
      cost
      costPerGram
      mermado
      name
      performance
      performancePercentage
      presentation
      supplier
      unit
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
