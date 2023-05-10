import {useMutation, useQuery} from "@apollo/react-hooks";
import {getManagerById, updateManager} from "@/services/Manager-Service";


export const useGetManagerQuery = (id?: string) => {
    return useQuery(getManagerById, {variables : {getManagerId: id}});;
}

export const useUpdatePhotoManagerMutation = () => {
    return useMutation(updateManager)
}