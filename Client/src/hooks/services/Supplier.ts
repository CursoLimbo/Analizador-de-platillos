import {useMutation, useQuery} from "@apollo/react-hooks";
import {createSupplierMutation, deleteSupplierMutation, getAllSuppliers, getSupplierById, updateSupplierMutation} from "../../services/Supplier-Service";


export const useGetAllSupplierQuery = () => {
    return useQuery(getAllSuppliers)
}

export const useCreateSupplierMutation = () => {
    return useMutation(createSupplierMutation)
} 

export const useUpdateSupplierMutation = () => {
    return useMutation(updateSupplierMutation)
} 

export const useDeleteSupplierMutation = () => {
    return useMutation(deleteSupplierMutation)
} 

export const useGetSupplierById = (id:string) => {
    return useQuery(getSupplierById, {variables:{"getSupplierId":id}})
}