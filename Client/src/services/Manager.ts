import {gql} from "apollo-boost";

export class ManagerService{

    getManagerByEmailAndPassword(){
        const GET_MANAGER_BY_EMAIL_AND_PASSWORD = gql `
        query GetManagerByEmailAndPassword($password: String!, $email: String!){
            getManagerByEmailAndPassword(password: $password, email: $email) {
                id 
            }
        `
        return GET_MANAGER_BY_EMAIL_AND_PASSWORD;
    }

    updateManager(){
        const UPDATE_MANAGER = gql `
        mutation UpdateManager($updateManager: ManagerType!){
            updateManager(updateManager: $updateManager) {
                id 
            }
        `
        return UPDATE_MANAGER;
    }
}