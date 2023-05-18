import {ApolloError, useMutation, useQuery} from "@apollo/react-hooks";
import {getManager, updateManagerInformation, updatePhotoManager} from "@/services/Manager-Service";

interface ManagerType {
    name: string,
    phone: string,
    email: string,
    whatsapp: string
}

export const useGetManagerQuery = () => {
    return useQuery(getManager);
}

export const useUpdatePhotoManagerMutation = () => {
    return useMutation(updatePhotoManager)
}

export const useUpdateManager = (onCompleted: (data: ManagerType) => void, onError:(message: string) => void) => {
    const [mutation] = useMutation(updateManagerInformation, {
        onCompleted: (data) => {
            onCompleted(data);
        },
        onError: (error: ApolloError) => {
            onError(error.message);
        }
    })

    const updateManager = (data: ManagerType) => {
        return mutation({
            variables: {
                updateManager: {data}
            }
        })
    }

    return updateManager;

}