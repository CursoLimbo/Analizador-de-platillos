import {useMutation, useQuery} from "@apollo/react-hooks";
import { createRecipeMutation,getAllRecipes,deleteRecipeMutation } from "services/Recipe-Service";

export const useCreateRecipeMutation = () => {
    return useMutation(createRecipeMutation);
}

export const useGetAllRecipes = () =>{
    return useQuery(getAllRecipes)
}

export const useDeleteRecipeMutation = () =>{
    return useMutation(deleteRecipeMutation)
}