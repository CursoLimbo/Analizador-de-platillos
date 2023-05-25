import React, {useState} from "react";
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
import {AppButton} from "@/components/Button";
import {useForm} from "react-hook-form";

interface updateCardProps {
    type: "business" | "personal"
    title: string
    name: string,
    email: string,
    phone: string,
    photo: string,
    whatsapp: string,
    updateInformation: (data) => void
}



const Updatecard: React.FC<updateCardProps> = (props) => {
    const {type, title, name, email, phone, whatsapp, updateInformation} = props;
    const {register, handleSubmit, watch, formState} = useForm();
    const {errors} = formState
    const [show, setShow] = useState(false);
    const formData = watch();

    const formSubmitManager = (data) => {
       console.log(data);
        setShow(true);
    }

   // const {ref, ...inputProps} = register("name", {required: "error text"})


    return<>
        <Stack className={style.info} spacing={5}>
            <Card sx={{maxWidth: 400}}>
                <form onSubmit={handleSubmit(formSubmitManager)}>

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
                            id="name"
                            label="Nombre"
                            defaultValue={name}
                            {...register("name", {required: true})}
                            error={!!errors.name}
                            helperText={errors.name && "Este campo es requerido"}
                        />

                    </div>

                    <div className={updateLineStyle.updateLine}>
                        <MailOutlineIcon fontSize="large" style={{marginRight: '16px'}}/>
                        <TextField
                            required
                            id="outlined-required"
                            label="Correo"
                            defaultValue={email}
                            {...register("email", {required: true})}
                        />
                        {errors.email && <p className={updateLineStyle.error}>El correo es requerido.</p>}

                    </div>

                    <div className={updateLineStyle.updateLine}>
                        <PhoneIphoneIcon fontSize="large" style={{marginRight: '16px'}}/>
                        <TextField
                            required
                            id="outlined-required"
                            label="Teléfono"
                            defaultValue={phone}
                            {...register("phone", {required: true})}

                        />

                        {errors.phone && <p className={updateLineStyle.error}>El telefono es requerido.</p>}

                    </div>

                    <div className={updateLineStyle.updateLine}>
                        <PhoneIphoneIcon fontSize="large" style={{marginRight: '16px'}}/>
                        <TextField
                            required
                            id="outlined-required"
                            label="Whatsapp"
                            defaultValue={whatsapp}
                            {...register("whatsapp", {required: true} )}

                        />
                        {errors.whatsapp && <p className={updateLineStyle.error}>El whatsapp es requerido.</p>}
                    </div>

                </CardContent>
                </form>
                <div  className={updateLineStyle.buttonSave}>

                    <AppButton>{"Guardar"}</AppButton>

                </div>


            </Card>
        </Stack>
    </>
}

export default Updatecard;