import {useMutation, useQuery} from "@apollo/react-hooks";
import { createRecipeMutation,getAllRecipes } from "services/Recipe-Service";

export const useCreateRecipeMutation = () => {
    return useMutation(createRecipeMutation);
}

export const useGetAllRecipes = () =>{
    return useQuery(getAllRecipes)
}
