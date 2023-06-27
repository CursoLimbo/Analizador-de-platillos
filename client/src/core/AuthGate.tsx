import React, {ReactNode, useEffect} from "react";
import {useAuthToken} from "@/hooks/auth/useAuthToken";
import {useRouter} from "next/navigation";

interface AuthGateProps {
    children?: ReactNode
}

export const AuthGate: React.FunctionComponent<AuthGateProps> = (props) => {
    const [authToken] = useAuthToken()
    const router = useRouter();

    useEffect(() => {
        if(!authToken) {
            router.push("/login")
        }
    }, [authToken])

    return <> {props.children} </>
};