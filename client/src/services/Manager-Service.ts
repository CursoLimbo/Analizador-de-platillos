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

export const updatePhotoManager = gql `
      mutation UpdateManager($updateManager: ManagerType!) {
           updateManager(updateManager: $updateManager) {
             id
           }
      }`


export const updateManagerInformation = gql `
      mutation UpdateManager($updateManager: ManagerType!){
            updateManager(updateManager: $updateManager){
                id
            }
      }`







