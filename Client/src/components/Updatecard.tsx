import React from "react";
import style from "@/styles/informationCard.module.css";
import updateLineStyle  from '@/styles/updateCard.module.css'
import {Stack} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import BusinessIcon from "@mui/icons-material/Business";
import Face4Icon from "@mui/icons-material/Face4";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import CardContent from "@mui/material/CardContent";
import TextField from '@mui/material/TextField';

interface updateCardProps {
    type: "business" | "personal"
    title: string
    name: string,
    email: string,
    phone: string,
    photo: string,
    whatsapp: string
}



const Updatecard: React.FC<updateCardProps> = (props) => {
    const {type, title, name, email, phone, whatsapp} = props;

    return<>
        <Stack className={style.info} spacing={5}>
            <Card sx={{maxWidth: 400}}>
                <CardContent>
                    <Typography className={"title"} gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>

                    <div className={updateLineStyle.updateLine}>
                        {
                            type === 'business' ?
                                <BusinessIcon fontSize="large" style={{marginRight: '16px'}}/> :
                                <Face4Icon fontSize="large" style={{marginRight: '16px'}}/>
                        }
                        <TextField
                            required
                            id="outlined-required"
                            label="Nombre"
                            defaultValue={name}

                        />

                    </div>

                    <div className={updateLineStyle.updateLine}>
                        <MailOutlineIcon fontSize="large" style={{marginRight: '16px'}}/>
                        <TextField
                            required
                            id="outlined-required"
                            label="Correo"
                            defaultValue={email}
                        />

                    </div>

                    <div className={updateLineStyle.updateLine}>
                        <PhoneIphoneIcon fontSize="large" style={{marginRight: '16px'}}/>
                        <TextField
                            required
                            id="outlined-required"
                            label="Teléfono"
                            defaultValue={phone}
                        />
                    </div>

                    <div className={updateLineStyle.updateLine}>
                        <PhoneIphoneIcon fontSize="large" style={{marginRight: '16px'}}/>
                        <TextField
                            required
                            id="outlined-required"
                            label="Whatsapp"
                            defaultValue={whatsapp}
                        />
                    </div>
                </CardContent>

            </Card>
        </Stack>
    </>
}

export default Updatecard;