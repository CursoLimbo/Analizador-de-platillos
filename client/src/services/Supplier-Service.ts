import { gql } from "apollo-boost";

export const getSupplierById = `
query GetSupplier($getSupplierId: String!) {
  getSupplier(id: $getSupplierId) {
    id
  }
}
`;

export const getAllSuppliers = `
query GetAllSuppliers {
  GetAllSuppliers {
    id
  }
}
`;

export const createSupplierMutation = `
mutation CreateSupplier($newSupplier: SupplierType!) {
  CreateSupplier(newSupplier: $newSupplier) {
    id
  }
}
`;

export const updateSupplierMutation = `
mutation UpdateSupplier($updateSupplier: SupplierType!) {
  updateSupplier(updateSupplier: $updateSupplier) {
    id
  }
}
`;

export const deleteSupplierMutation = `
mutation DeleteSupplier($deleteSupplierId: String!) {
  deleteSupplier(id: $deleteSupplierId)
}
`;
