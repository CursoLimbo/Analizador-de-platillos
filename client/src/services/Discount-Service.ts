import { gql } from "apollo-boost";


export const GetDiscountById = gql`
query GetDiscountById($getDiscountByIdId: String!) {
  getDiscountById(id: $getDiscountByIdId) {
    id
  }
}
`;

export const GetAllDiscounts = gql`
  query GetAllQuotations {
    GetAllDiscounts {
      description
      id
      sid
      name
      percentage
  }
}
`;

export const CreateDiscount = gql`
mutation CreateDiscount($newDiscount: DiscountType!) {
  CreateDiscount(newDiscount: $newDiscount) {
    id
  }
}
`;

export const UpdateDiscount = gql`
mutation UpdateDiscount($updateDiscount: DiscountType!) {
  updateDiscount(updateDiscount: $updateDiscount) {
    id
  }
}
`;

export const DeleteDiscount = gql`
mutation DeleteDiscount($deleteDiscountId: String!) {
  deleteDiscount(id: $deleteDiscountId)
}
`;
