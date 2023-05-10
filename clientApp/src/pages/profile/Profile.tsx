import React, {useContext} from "react";
import {NavBar} from "../../components/NavBar";
import "./Profile.css"
import logo from "../../assets/img/logoProfile.jpg"
import {useGetManagerQuery} from "../../services/Manager-Service";
import {ManagerContext, ManagerContextState} from "../../context/managerContext";


export const Profile : React.FC = () => {
    const context = useContext<ManagerContextState>(ManagerContext);
    console.log("Current contexts", context)

    const getManager = useGetManagerQuery(context.id);

    return <>
        <NavBar isHome={false}></NavBar>
        <img className={"imgLogo"}
            src={`${logo}?w=330&h=330&fit=crop&auto=format`}
            srcSet={`${logo}?w=330&h=330&fit=crop&auto=format&dpr=2 2x`}
            width={"60%"}
            height={"350px"}
        />
    </>
}