import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";


const getManagerById = gql `
        query GetManager($getManagerId: String!) {
                  getManager(id: $getManagerId) {
                    name, 
                    email,
                    phone,
                    whatsapp,
                    bankAccounts,
                    password
                  }
        }`


export const useGetManagerQuery = (id?: string) => {
   const {data} = useQuery(getManagerById);

   const getManager = () => {
       console.log(data)
       return data({
           variables: {id: id}
       })
   }

   return getManager;
}
