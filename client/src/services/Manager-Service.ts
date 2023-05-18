import {gql} from "apollo-boost";



export const getManager = gql `
        query GetManager {
                  getManager {
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




