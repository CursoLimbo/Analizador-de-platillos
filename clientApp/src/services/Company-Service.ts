import { gql } from "apollo-boost";

export const GetCompany = gql`
  query GetCompany($id: String!) {
    getCompany(id: $id) {
      id
    }
  }
`;

export const CreateCompany = gql`
  mutation CreateCompany($newCompany: CompanyType!) {
    createCompany(newCompany: $newCompany) {
      id
    }
  }
`;

export const UpdateCompany = gql`
  mutation UpdateCompany($updateCompany: CompanyType!) {
    updateCompany(updateCompany: $updateCompany) {
      id
    }
  }
`;
