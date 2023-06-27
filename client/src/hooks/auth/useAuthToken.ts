import { useApolloClient } from "@apollo/react-hooks";
import { useCookies } from "react-cookie";

const TOKEN_NAME = "authToken";

export const useAuthToken = () => {
    const [cookies, setCookie] = useCookies();
    const setAuthToken = (authToken:string) => setCookie(TOKEN_NAME, authToken);

    return [cookies[TOKEN_NAME], setAuthToken];
};


export const useLogout = () => {
    const [, , removeCookie] = useCookies([TOKEN_NAME]);
    const apolloClient = useApolloClient();

    const logout = async () => {
        await apolloClient.clearStore(); // we remove all information in the store
        removeCookie(TOKEN_NAME);
    };

    return logout;
};
