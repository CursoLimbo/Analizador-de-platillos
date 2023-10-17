import {useMutation, useQuery} from "@apollo/react-hooks";
import {CreateClientMutation} from "services/Client-Service";

export const useCreateClientMutation = () => {
    return useMutation(CreateClientMutation);
} 