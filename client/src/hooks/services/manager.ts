import { useMutation, useQuery} from "@apollo/react-hooks";
import {getManager, updateManagerInformation, updatePhotoManager} from "../../services/Manager-Service";


export const useGetManagerQuery = (() => {
    return useQuery(getManager,  {
        fetchPolicy: "no-cache"

    });
})

export const useUpdatePhotoManagerMutation = () => {
    return useMutation(updatePhotoManager)
}

export const useUpdateManagerMutation = () => {
    return useMutation(updateManagerInformation);
}