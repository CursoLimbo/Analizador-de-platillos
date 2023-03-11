import React, {useState} from "react";
import "./LogIn.css"
import {Stack, TextField} from "@mui/material";
import {AppButton} from "../components/Button";
import {useLogInQuery} from "../services/useLogInQuery";
import {useNavigate} from "react-router-dom";


export const LogIn: React.FunctionComponent = ()=> {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const login = useLogInQuery(() => {
        navigate("/app/home")
    }, (error) => {
        alert(error)//error message in the state
    });

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