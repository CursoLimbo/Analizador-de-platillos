import {useMutation, useQuery} from "@apollo/react-hooks";
import {createIngredientMutation, getAllIngredients} from "../../services/Ingredient-Service";



export const useCreateIngredientMutation = () => {
    return useMutation(createIngredientMutation)
} 


export const useGetAllIngredients = () => {
    return useQuery(getAllIngredients)
} 