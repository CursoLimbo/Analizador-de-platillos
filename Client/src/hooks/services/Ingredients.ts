import {useMutation, useQuery} from "@apollo/react-hooks";
import { createIngredientMutation } from "@/services/Ingredient-Service";


export const useCreateIngredientMutation = () => {
    return useMutation(createIngredientMutation)
} 