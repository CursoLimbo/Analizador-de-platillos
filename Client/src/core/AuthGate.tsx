import React, {ReactNode} from "react";
import {LogIn} from "../screens/LogIn";
import {useAuthToken} from "../hooks/auth/useAuthToken";
import {Navigate} from "react-router-dom";

interface AuthGateProps {
    children?: ReactNode
}

export const AuthGate: React.FunctionComponent<AuthGateProps> = (props) => {
    const [authToken] = useAuthToken()

    if (authToken) {
        return <> {props.children} </>//renderice
    }

    return <Navigate to={"/app/log-in"} />;
};