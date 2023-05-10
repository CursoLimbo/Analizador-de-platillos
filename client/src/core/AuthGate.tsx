import React, {ReactNode, useContext, useEffect} from "react";
import {useAuthToken} from "@/hooks/auth/useAuthToken";
import {ManagerContext, ManagerContextState} from "@/contexts/managerContext";
import {useRouter} from "next/navigation";

interface AuthGateProps {
    children?: ReactNode
}

export const AuthGate: React.FunctionComponent<AuthGateProps> = (props) => {
    const [authToken] = useAuthToken()
    const context = useContext<ManagerContextState>(ManagerContext);
    const router = useRouter();

    useEffect(() => {
        if(!authToken) {
            router.push("/login")
        }
    }, [authToken])

    return <> {props.children} </> //renderice
};