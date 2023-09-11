import { useMutation,useQuery } from "@apollo/client";
import { createRecipeMutation } from "services/Recipe-Service";

export const useCreateRecipeMutation = () => {
    return useMutation(createRecipeMutation);
}