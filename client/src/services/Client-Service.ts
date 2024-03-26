import { gql } from "apollo-boost";

export const GetClientById = gql`
  query GetClientById($getClientByIdId: String!) {
    getClientById(id: $getClientByIdId) {
      id
    }
  }
`;

export const GetAllClients = gql`
  query GetAllClients {
    GetAllClients {
      email
      id
      location
      name
      phone
      sid
      whatsapp
    }
  }  
`;

export const CreateClient = gql`
  mutation CreateClient($newClient: ClientType!) {
    createClient(newClient: $newClient) {
      id
    }
  }
`;

export const UpdateClient = gql`
  mutation UpdateClient($updateClient: ClientType!) {
    updateClient(updateClient: $updateClient) {
      id
    }
  }
`;

export const DeleteClient = gql`
  mutation DeleteClient($deleteClientId: String!) {
    deleteClient(id: $deleteClientId)
  }
`;

export const CreateClientMutation = gql`
mutation Mutation($newClient: ClientType!) {
  CreateClient(newClient: $newClient) {
    email
    id
    location
    name
    phone
    whatsapp
  }
}`;