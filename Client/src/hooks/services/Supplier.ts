import {useMutation, useQuery} from "@apollo/react-hooks";
import {getAllSuppliers} from "../../services/Supplier-Service";


export const useGetAllSupplierQuery = () => {
    return useQuery(getAllSuppliers)
}