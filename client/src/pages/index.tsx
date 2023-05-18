import React from "react";
import styles from "../styles/index.module.css";
import {ImageList, ImageListItem} from "@mui/material";
import { NavBar } from "@/components/NavBar";
import { AppButton } from "@/components/Button";
import {AuthGate} from "@/core/AuthGate";
import {AppModules} from "@/core/AppModules";
import {Fonts} from "@/styles/fonts";
import {Footer} from "@/components/Footer";

const Home = () => {
const {welcomeFont, titleStyle} = Fonts;

    return <AuthGate>
        <NavBar isHome={true}></NavBar>
        <div className={styles.contMain}>
        <span className={welcomeFont.className} style={titleStyle}>
              Bienvenida Lu
          </span>
            <div className={styles.objects}>
                <ImageList sx={{width: 700}} rowHeight={330} gap={20} cols={3}>
                    {AppModules.map((module) => (
                        <ImageListItem key={module.img}>
                            <img
                                src={`${module.img}?w=330&h=330&fit=crop&auto=format`}
                                srcSet={`${module.img}?w=330&h=330&fit=crop&auto=format&dpr=2 2x`}

                            />
                            <AppButton>{module.buttonName}</AppButton>
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </div>
    </AuthGate>
}

export default Home