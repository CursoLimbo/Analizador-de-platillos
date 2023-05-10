import {gql} from "apollo-boost";
import {ApolloError, useLazyQuery, useMutation, useQuery} from "@apollo/react-hooks";


export const getManagerById = gql `
        query GetManager($getManagerId: String!) {
                  getManager(id: $getManagerId) {
                    name, 
                    email,
                    phone,
                    whatsapp,
                    bankAccounts,
                    photo
                  }
        }`

export const updateManager = gql `
      mutation UpdateManager($updateManager: ManagerType!) {
           updateManager(updateManager: $updateManager) {
             id
           }
      }`




