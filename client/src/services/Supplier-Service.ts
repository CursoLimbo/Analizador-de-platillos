import { gql } from "apollo-boost";

export const getSupplierById = gql`
query GetSupplier($getSupplierId: String!) {
  getSupplier(id: $getSupplierId) {
    id
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
mutation UpdateSupplier($updateSupplier: SupplierType!) {
  updateSupplier(updateSupplier: $updateSupplier) {
    id
  }
}
`;

export const deleteSupplierMutation = gql`
mutation DeleteSupplier($deleteSupplierId: String!) {
  deleteSupplier(id: $deleteSupplierId)
}
`;
