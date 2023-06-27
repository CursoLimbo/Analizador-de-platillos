import React from "react";
import {Stack} from "@mui/material";
import {Fonts} from "@/styles/fonts";
import style from "@/styles/informationCard.module.css"
import ImageUpload from "./imgLoad";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Face4Icon from '@mui/icons-material/Face4';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import BusinessIcon from '@mui/icons-material/Business';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


interface informationCardProps {
    type: "business" | "personal"
    title: string
    name: string,
    email: string,
    phone: string,
    photo: string,
    whatsapp: string,
    onPictureChanged: (publicId: string) => void
}

const InformationCard : React.FC<informationCardProps> = (props) => {
    const {profileFont} = Fonts;
    const {title, type, name, email, phone, photo, whatsapp} = props;

    return <Stack className={style.info} spacing={5}>
        <Card sx={{maxWidth: 400}}>
            <ImageUpload
                onImageUpload={publicId => props.onPictureChanged(publicId)}
                photo={photo}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>

                <div className={style.infoLine}>
                    {
                        type === 'business' ?
                            <BusinessIcon fontSize="large" style={{marginRight: '16px'}}/> :
                            <Face4Icon fontSize="large" style={{marginRight: '16px'}}/>
                    }
                    <span className={profileFont.className}>  {name}</span>
                </div>

                <div className={style.infoLine}>
                    <MailOutlineIcon fontSize="large" style={{marginRight: '16px'}}/>
                    <span className={profileFont.className}>  {email}</span>
                </div>

                <div className={style.infoLine}>
                    <PhoneIphoneIcon fontSize="large" style={{marginRight: '16px'}}/>
                    <span className={profileFont.className}> {phone}</span>
                </div>

                <div className={style.infoLine}>
                    <WhatsAppIcon fontSize="large" style={{marginRight: '16px'}}/>
                    <span className={profileFont.className}> {whatsapp}</span>
                </div>

            </CardContent>
        </Card>
    </Stack>
}

export default InformationCard;