import {useMutation, useQuery} from "@apollo/react-hooks";
import { createRecipeMutation,getAllRecipes,deleteRecipeMutation,getRecipeById, updateRecipeMutation } from "services/Recipe-Service";

export const useCreateRecipeMutation = () => {
    return useMutation(createRecipeMutation);
}

export const useGetAllRecipes = () =>{
    return useQuery(getAllRecipes)
}

export const useDeleteRecipeMutation = () =>{
    return useMutation(deleteRecipeMutation)
}

export const useGetRecipeById = (id:string) => {
    return useQuery(getRecipeById,{variables:{"getRecipeId":id}})
}

export const useUpdateRecipeMutation = () => {
    return useMutation(updateRecipeMutation)
}