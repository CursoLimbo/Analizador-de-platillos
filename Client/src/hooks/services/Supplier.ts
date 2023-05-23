import {useMutation, useQuery} from "@apollo/react-hooks";
import { getAllSuppliers } from "@/services/Supplier-Service";

export const useGetAllSupplier = () => {
    return useQuery(getAllSuppliers)
}