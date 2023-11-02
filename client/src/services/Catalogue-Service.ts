import { gql } from "apollo-boost";

export const GetCatalogue = gql`
  query GetCatalogue($catalogueId: String!) {
    getCatalogue(id: $catalogueId) {
      id
    }
  }
`;

export const GetAllCatalogues = gql`
  query GetAllCatalogues {
    GetAllCatalogues {
      date
      file
      id
      name
    }
  }
`;

export const CreateCatalogue = gql`
  mutation CreateCatalogue($newCatalogue: CatalogueType!) {
    createCatalogue(newCatalogue: $newCatalogue) {
      id
    }
  }
`;

export const UpdateCatalogue = gql`
  mutation UpdateCatalogue($updateCatalogue: CatalogueType!) {
    updateCatalogue(updateCatalogue: $updateCatalogue) {
      id
    }
  }
`;

export const DeleteCatalogue = gql`
  mutation Mutation($deleteCatalogueId: String!) {
    deleteCatalogue(id: $deleteCatalogueId)
  }
`;