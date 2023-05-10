import { gql } from "apollo-boost";


export const GetAdditionalSpot= gql`
    query GetAdditionalSpot($id: String!) {
    getAdditionalSpotById(id: $id) {
      id
    }
  }
`;

export const GetALlAdditionalSpot = gql`
  query GetALlAdditionalSpot {
    GetALlAdditionalSpot {
      id
    }
  }
`;

export const CreateAdditionalSpot = gql`
  mutation CreateAdditionalSpot($newAdditionalSpot: AdditionalSpotType!) {
    reateAdditionalSpot(newAdditionalSpot: $newAdditionalSpot) {
      id
    }
  }
`;

export const updateAdditionalSpot = gql`
  mutation UpdateAdditionalSpot($updateAdditionalSpot: AdditionalSpotType!) {
    updateAdditionalSpot(updateAdditionalSpot: $updateAdditionalSpot) {
      id
    }
  }

`;

export const deleteAdditionalSpot = gql`
  mutation DeleteAdditionalSpot($deleteAdditionalSpotId: String!) {
    deleteAdditionalSpot(id: $deleteAdditionalSpotId)
  }

`;

