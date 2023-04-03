import { gql } from "apollo-boost";

export const getTypeOfQuoteById = `
query GetTypeOfQuote($getTypeOfQuoteId: String!) {
  getTypeOfQuote(id: $getTypeOfQuoteId) {
    id
  }
}
`;

export const getAllTypeOfQuotes = `
query GetAllTypeOfQuotes {
  GetAllTypeOfQuotes {
    id
  }
}
`;

export const createTypeOfQuoteMutation = `
mutation CreateTypeOfQuote($newTypeOfQuote: TypeOfQuoteType!) {
  CreateTypeOfQuote(newTypeOfQuote: $newTypeOfQuote) {
    id
  }
}
`;

export const updateTypeOfQuoteMutation = `
mutation UpdateTypeOfQuote($updateTypeOfQuote: TypeOfQuoteType!) {
  updateTypeOfQuote(updateTypeOfQuote: $updateTypeOfQuote) {
    id
  }
}
`;

export const deleteTypeOfQuoteMutation = `
mutation DeleteTypeOfQuote($deleteTypeOfQuoteId: String!) {
  deleteTypeOfQuote(id: $deleteTypeOfQuoteId)
}
`;
