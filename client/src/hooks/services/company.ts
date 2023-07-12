import {useMutation, useQuery} from "@apollo/react-hooks";
import {getCompany, updateCompany} from "../../services/Company-Service";


export const useGetCompanyQuery = ( () => {
    return useQuery(getCompany, {
        fetchPolicy: "no-cache"
    });
})

export const useUpdatePhotoCompanyMutation = () => {
    return useMutation(updateCompany);
}

export const useUpdateCompanyMutation = () => {
    return useMutation(updateCompany);
}