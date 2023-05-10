import React, {useContext, useState} from "react";
import "./LogIn.css"
import {Stack, TextField} from "@mui/material";
import {AppButton} from "../../components/Button";
import {useLogInQuery} from "../../services/useLogInQuery";
import {redirect} from "react-router-dom";
import {ManagerContext, ManagerContextState} from "../../context/managerContext";


export const LogIn: React.FunctionComponent = ()=> {
    const context = useContext<ManagerContextState>(ManagerContext);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const login = useLogInQuery((data) => {
        if(context.setId) {
            context.setId(data.getManagerByEmailAndPassword.id);
            console.log("REDIRECTING")
            redirect("/")
        }
    }, (error) => {
        alert(error)
    });

    console.log("Current contexts", context)

    return <Stack direction={"row"}>

        <div className={"logInBox"}>
            <Stack className={"txt"} spacing={5}>
                <TextField id="email"
                           label="Correo"
                           variant="outlined"
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               setEmail(event.target.value);
                           }
                           }
                />
                <TextField id="password" label="Password" type="password" variant="outlined"
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               setPassword(event.target.value);
                           }
                           }
                />
                <AppButton className={"btn-in"} variant="contained"
                           onClick={() => {
                               if (password && email) {
                                   login(password, email)
                               }
                           }}

                >Entrar</AppButton>
            </Stack>
        </div>

        <div className={"banner"}/>
    </Stack>

}