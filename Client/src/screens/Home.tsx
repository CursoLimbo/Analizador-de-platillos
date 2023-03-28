import {AppButton} from "../components/Button";
import React from "react";
import "./Home.css"
import {useLogout} from "../hooks/auth/useAuthToken";
import {Grid, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import ingredientsImg from "../assets/img/ingredients.jpg";
import clientsImg from "../assets/img/clients.jpg"
import suppliersImg from "../assets/img/suppliers.jpg"
import quotationImg from "../assets/img/quotations.jpg"
import recipesImg from "../assets/img/recipes.jpg"
import cataloguesImg from "../assets/img/catalogues.jpg"
import discountsImg from "../assets/img/disccounts.jpg"


export const Home = () => {
   //const logOut = useLogout();

    return<div className={"cont-main"}>
        <span className="font-link">
              Bienvenida Lu
          </span>
    <div className={"objects"}>
        <ImageList sx={{ width: 700}} rowHeight={330} gap={20} cols={3} >
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=330&h=330&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=330&h=330&fit=crop&auto=format&dpr=2 2x`}

                    />
                    <AppButton>{item.buttonName}</AppButton>
                </ImageListItem>
            ))}
        </ImageList>
    </div>
    </div>

}

const itemData = [

    {
        img: ingredientsImg,
        buttonName: "Ingredientes"
    },
    {
        img: clientsImg,
        buttonName: "Clientes"
    },
    {
        img: suppliersImg,
        buttonName: "Provedores"
    },
    {
        img: quotationImg,
        buttonName: "Cotizaciones"
    },
    {
        img: recipesImg,
        buttonName: "Recetas"
    },
    {
        img: cataloguesImg,
        buttonName: "catalogos"
    },
    {
        img: discountsImg,
        buttonName: "Descuentos"
    }
]