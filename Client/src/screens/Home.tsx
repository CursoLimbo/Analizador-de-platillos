import {AppButton} from "../components/Button";
import React from "react";
import {useLogout} from "../hooks/auth/useAuthToken";

export const Home = () => {
   const logOut = useLogout();
    return <div>Hello there!
        <AppButton className={"btn"} variant="contained"
                   onClick={() => {
                       logOut()
                   }}

        >Salir</AppButton>

    </div>

}