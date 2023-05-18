import {useMutation, useQuery} from "@apollo/react-hooks";
import {getManager, updateManager} from "@/services/Manager-Service";


export const useGetManagerQuery = () => {
    return useQuery(getManager);
}

export const useUpdatePhotoManagerMutation = () => {
    return useMutation(updateManager)
}