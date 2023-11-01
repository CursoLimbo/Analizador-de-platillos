import {useMutation, useQuery} from "@apollo/react-hooks";
import {createQuotationMutation, deleteQuotationMutation, getAllQuotations, getQuotationById, updateQuotationMutation,} from "../../services/Quotation-Service";


export const useGetAllQuotations = () => {
    return useQuery(getAllQuotations)
}

export const useCreateQuotationMutation = () => {
    return useMutation(createQuotationMutation)
} 

export const useUpdateQuotationMutation = () => {
    return useMutation(updateQuotationMutation)
} 

export const useDeleteQuotationMutation = () => {
    return useMutation(deleteQuotationMutation)
} 

export const useGetQuotationById = (id:string) => {
    return useQuery(getQuotationById, {variables:{"getQuotationId":id}})
}