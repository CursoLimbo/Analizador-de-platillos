import {gql} from "apollo-boost";
import {useAuthToken} from "../hooks/auth/useAuthToken";
import {ApolloError, useLazyQuery} from "@apollo/client";

const logInQuery = gql `
        query GetManagerByEmailAndPassword($password: String!, $email: String!){
            getManagerByEmailAndPassword(password: $password, email: $email) {
                token,
                id
            }
        }
        `

export const useLogInQuery = (onCompleted: (data: any) => void, onError: (message: string) => void) => {
    const [_, setAuthToken, removeAuthToken] = useAuthToken();

    const [query] = useLazyQuery(logInQuery, {
        onCompleted: (data) => {

            if(data?.getManagerByEmailAndPassword?.token) {
                setAuthToken(data.getManagerByEmailAndPassword.token);
            }

            onCompleted(data)
        },
        onError: (error: ApolloError) => {
            onError(error.message)
        }
    });


    const login = (password: string, email: string) => {
        return query({
            variables: {
                password,
                email
            }
        });
    }

    return login
};




