import {useMutation, useQuery} from "@apollo/react-hooks";
import {CreateDiscount, DeleteDiscount, GetAllDiscounts, GetDiscountById, UpdateDiscount} from "services/Discount-Service";

export const useCreateDiscountMutation = () => {
    return useMutation(CreateDiscount);
} 

export const useUpdateDiscountMutation = () => {
    return useMutation(UpdateDiscount)
} 

export const useDeleteDiscountMutation  = () => {
    return useMutation(DeleteDiscount)
} 

export const useGetAllDiscounts = () => {
    return useQuery(GetAllDiscounts)
} 

export const useGetDiscountById = (id:string) => {
    return useQuery(GetDiscountById, {variables:{"getDiscountId":id}})
}