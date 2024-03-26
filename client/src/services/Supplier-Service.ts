import { gql } from "apollo-boost";

export const getSupplierById = gql`
query GetSupplier($getSupplierId: String!) {
  getSupplier(id: $getSupplierId) {
    id
    name
    location
    phone
  }
}
`;

export const getAllSuppliers = gql`
query GetAllSuppliers {
  GetAllSuppliers {
    name
    phone
    location
    id
    sid
  }
}
`;

export const createSupplierMutation = gql`
mutation CreateSupplier($newSupplier: SupplierType!) {
  CreateSupplier(newSupplier: $newSupplier) {
    id
    name
    location
    phone
  }
}
`;

export const updateSupplierMutation = gql`
mutation Mutation($updateSupplier: SupplierType!) {
  updateSupplier(updateSupplier: $updateSupplier) {
    id
    name
    location
    phone
  }
}
`;

export const deleteSupplierMutation = gql`
mutation DeleteSupplier($deleteSupplierId: String!) {
  deleteSupplier(id: $deleteSupplierId)
}
`;
