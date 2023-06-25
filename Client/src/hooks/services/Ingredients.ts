import {useMutation, useQuery} from "@apollo/react-hooks";
import { createIngredientMutation,getAllIngredients,updateIngredientMutation,getIngredientById } from "@/services/Ingredient-Service";


export const useCreateIngredientMutation = () => {
    return useMutation(createIngredientMutation)
} 


export const useGetAllIngredients = () => {
    return useQuery(getAllIngredients)
} 

export const useUpdateIngredientMutation = () => {
    return useMutation(updateIngredientMutation)
}

export const useGetIngredientById = (id: string) => {
    return useQuery(getIngredientById, {variables: {id}})
}