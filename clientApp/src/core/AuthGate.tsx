import React, {ReactNode, useContext} from "react";
import {LogIn} from "../pages/login/LogIn";
import {useAuthToken} from "../hooks/auth/useAuthToken";
import {Navigate} from "react-router-dom";
import {ManagerContext, ManagerContextState} from "../context/managerContext";

interface AuthGateProps {
    children?: ReactNode
}

export const AuthGate: React.FunctionComponent<AuthGateProps> = (props) => {
    const [authToken] = useAuthToken()
    const context = useContext<ManagerContextState>(ManagerContext);
    console.log("Current contexts", context)

    if (authToken) {
        return <> {props.children} </>//renderice
    }

    return <Navigate to={"/log-in"} />;
};