import { gql } from "apollo-boost";

export const getCompany = gql`
  query GetCompany {
      getCompany {
        id,
        sid,
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
