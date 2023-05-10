import { gql } from "apollo-boost";

export const getQuotationById = `
query GetQuotation($getQuotationId: String!) {
  getQuotation(id: $getQuotationId) {
    id
  }
}
`;

export const getAllQuotations = `
query GetAllQuotations {
  GetAllQuotations {
    id
  }
}
`;

export const createQuotationMutation = `
mutation CreateQuotation($newQuotation: QuotationType!) {
  CreateQuotation(newQuotation: $newQuotation) {
    id
  }
}
`;

export const updateQuotationMutation = `
mutation UpdateQuotation($updateQuotation: QuotationType!) {
  updateQuotation(updateQuotation: $updateQuotation) {
    id
  }
}
`;

export const deleteQuotationMutation = `
mutation DeleteQuotation($deleteQuotationId: String!) {
  deleteQuotation(id: $deleteQuotationId)
}
`;
