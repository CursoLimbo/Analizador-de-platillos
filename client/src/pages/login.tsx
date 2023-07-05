import React, {useState} from "react";
import "../styles/login.module.css"
import {Stack, TextField} from "@mui/material";
import {AppButton} from "@/components/Button";
import {useLogInQuery} from "@/services/useLogInQuery";

import {useRouter} from "next/navigation";
import styles from '../styles/login.module.css'

const Login: React.FunctionComponent = ()=> {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const router = useRouter();

    const login = useLogInQuery(() => {
        router.push("/");
    }, (error) => {
        alert(error)
    });


    return <Stack direction={"row"}>
        <div className={styles.logInBox}>
            <Stack className={styles.txt} spacing={5}>
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
                <AppButton className={styles.btnIn} variant="contained"
                           onClick={() => {
                               if (password && email) {
                                   login(password, email)
                               }
                           }}

                >Entrar</AppButton>
            </Stack>
        </div>

        <div className={styles.banner}/>
    </Stack>
}

export default Login