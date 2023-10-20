import { Stack, TextField } from "@mui/material";
import { AppButton } from "components/Button";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";
import { useCreateClientMutation } from "../hooks/services/Clients";
import React from "react";
import { useForm } from "react-hook-form";

type ClientFormatData = {
    name: string;
    email: string;
    location: string;
    whatsapp: string;
    phone: string;
};

const clientRegister: React.FC= () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ClientFormatData>();
    const [mutate] = useCreateClientMutation();

    const onSubmit = async (data: ClientFormatData) => {
        const newClients : ClientFormatData = {
            name: data.name,
            email: data.email,
            location: data.location,
            whatsapp: data.whatsapp,
            phone: data.phone,
    
        };
    
        const confirm = await ConfirmAlert();
    
        if (confirm) {
          console.log(newClients);
          mutate({ variables: { newClient: newClients } })
            .then((response) => {
              SuccessAlert("Cliente registrado exitosamente");
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
              ErrorAlert("Cliente no registrado");
            });
        }
    };
return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"column"} spacing={5} alignItems={"center"}>
        <Stack
          alignItems={"center"}
          fontFamily={"Times New Roman"}
          fontSize={28}
        >
          <h1>Registrar cliente</h1>
        </Stack>

        <Stack direction={"row"}>

        <Stack
        direction={"column"}
        spacing={5}
        width={300}
        alignItems={"center"}>
          <TextField
            id="name"
            label="Nombre"
            variant="outlined"
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={errors.name && "Este campo es requerido"}
          />
          <TextField
            id="location"
            label="Ubicación"
            variant="outlined"
            {...register("location", { required: true })}
            error={!!errors.location}
            helperText={errors.location && "Este campo es requerido"}
          />
          <TextField
            id="phone"
            label="Teléfono"
            variant="outlined"
            {...register("phone", { required: true })}
            error={!!errors.phone}
            helperText={errors.phone && "Este campo es requerido"}
          />
        </Stack>

        <Stack
        direction={"column"}
        spacing={5}
        width={300}
        alignItems={"center"}>
          <TextField
            id="email"
            label="Correo electrónico"
            variant="outlined"
            type="email"
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email && "Este campo es requerido"}
          />
          <TextField
            id="whatsapp"
            label="WhatsApp"
            variant="outlined"
            {...register("whatsapp", { required: true })}
            error={!!errors.whatsapp}
            helperText={errors.whatsapp && "Este campo es requerido"}
          />
        </Stack>
        </Stack>

        <Stack>
          <AppButton type="submit">Guardar</AppButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default clientRegister;




