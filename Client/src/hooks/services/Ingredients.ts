import {useMutation, useQuery} from "@apollo/react-hooks";
import {createIngredientMutation, getAllIngredients,updateIngredientMutation,deleteIngredientMutation,getIngredientById} from "../../services/Ingredient-Service";



export const useCreateIngredientMutation = () => {
    return useMutation(createIngredientMutation)
} 

export const useUpdateIngredientMutation = () => {
    return useMutation(updateIngredientMutation)
} 

export const useDeleteIngredientMutation = () => {
    return useMutation(deleteIngredientMutation)
} 


export const useGetAllIngredients = () => {
    return useQuery(getAllIngredients)
} 

export const useGetIngredientById = (id:string) => {
    return useQuery(getIngredientById, {variables:{"getIngredientId":id}})
}