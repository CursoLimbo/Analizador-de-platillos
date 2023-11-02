import {useMutation, useQuery} from "@apollo/react-hooks";
import { CreateCatalogue, DeleteCatalogue, GetAllCatalogues, GetCatalogue, UpdateCatalogue } from "services/Catalogue-Service";

export const useCreateCatalogueMutation = () => {
    return useMutation(CreateCatalogue);
} 

export const useUpdateCatalogueMutation = () => {
    return useMutation(UpdateCatalogue)
} 

export const useDeleteCatalogueMutation = () => {
    return useMutation(DeleteCatalogue)
} 

export const useGetAllCatalogues = () => {
    return useQuery(GetAllCatalogues)
} 

export const useGetCatalogueById = (id:string) => {
    return useQuery(GetCatalogue, {variables:{"getCatalogueId":id}})
}