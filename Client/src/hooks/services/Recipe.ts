import {useMutation, useQuery} from "@apollo/react-hooks";
import { createRecipeMutation } from "services/Recipe-Service";

export const useCreateRecipeMutation = () => {
    return useMutation(createRecipeMutation);
}