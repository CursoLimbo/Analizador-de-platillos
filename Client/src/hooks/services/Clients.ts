import {useMutation, useQuery} from "@apollo/react-hooks";
import {DeleteClient, GetAllClients, UpdateClient, GetClientById, CreateClientMutation} from "services/Client-Service";

export const useCreateClientMutation = () => {
    return useMutation(CreateClientMutation);
} 

export const useUpdateClientMutation = () => {
    return useMutation(UpdateClient)
} 

export const useDeleteClientMutation = () => {
    return useMutation(DeleteClient)
} 

export const useGetAllClients = () => {
    return useQuery(GetAllClients)
} 

export const useGetClientById = (id:string) => {
    return useQuery(GetClientById, {variables:{"getClientId":id}})
}