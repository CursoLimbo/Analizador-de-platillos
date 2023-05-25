import { gql } from "apollo-boost";

export const getCompany = gql`
  query GetCompany {
      getCompany {
        id,
        name,
        email,
        phone,
        logo,
        whatsapp
      }
  }
`;

export const updateCompany = gql`
  mutation UpdateCompany($updateCompany: CompanyType!) {
    updateCompany(updateCompany: $updateCompany) {
      id
    }
  }
`;
