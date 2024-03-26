import { gql } from "apollo-boost";

export const getQuotationById = gql`
query GetQuotation($getQuotationId: String!) {
  getQuotation(id: $getQuotationId) {
    id
  }
}
`;

export const getAllQuotations = gql`
query GetAllQuotations {
  GetAllQuotations {
    client
    sid
    date
    id
    name
    code
  }
}
`;

export const createQuotationMutation = gql`
mutation CreateQuotation($newQuotation: QuotationType!) {
  CreateQuotation(newQuotation: $newQuotation) {
    id
  }
}
`;

export const updateQuotationMutation = gql`
mutation UpdateQuotation($updateQuotation: QuotationType!) {
  updateQuotation(updateQuotation: $updateQuotation) {
    id
  }
}
`;

export const deleteQuotationMutation = gql`
mutation DeleteQuotation($deleteQuotationId: String!) {
  deleteQuotation(id: $deleteQuotationId)
}
`;
