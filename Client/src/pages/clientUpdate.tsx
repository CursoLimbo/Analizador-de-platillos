import { Stack, TextField } from "@mui/material";
import { AppButton } from "components/Button";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  useGetClientById,
  useUpdateClientMutation,
} from "../hooks/services/Clients";
import layout from '../styles/layout.module.css'
import Title from "components/Title";


type ClientFormatData = {
    id: string;
    name: string;
    email: string;
    location: string;
    whatsapp: string;
    phone: string;
};

const clientUpdate: React.FC= () => {
  const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ClientFormatData>();
  const [mutate] = useUpdateClientMutation();
  const router = useRouter();
  const { idUpdate } = router.query;
  const [id, setId] = useState<string>("");
  const [client, setClient] = useState<ClientFormatData | undefined>(
    undefined
  );
  const [confirmData, setConfirmData] = useState(false);

  useEffect(() => {
    if (typeof idUpdate === "string") {
      setId(idUpdate);
    }
  }, [idUpdate]);

  const { data: clientData, loading: clientLoading } =
    useGetClientById(id);

  useEffect(() => {
    if (clientData && !clientLoading) {
      setClient(clientData.getClient);
      setConfirmData(true);
    };
  }, [clientData, clientLoading]);

    const onSubmit = async (data: ClientFormatData) => {
        const newClients : ClientFormatData = {
          id:id,
          name: data.name,
          email: data.email,
          location: data.location,
          whatsapp: data.whatsapp,
          phone: data.phone,
        };
    
        const confirm = await ConfirmAlert();
    
        if (confirm) {
          console.log(newClients);
          mutate({ variables: { updateClient: newClients } })
            .then((response) => {
              SuccessAlert("Cliente actualizado exitosamente");
              router.push(`/clients?Update=${encodeURIComponent("true")}`);
            })
            .catch((error) => {
              console.log(error);
              ErrorAlert("Cliente no registrado");
            });
        }
    };
return (
  <form onSubmit={handleSubmit(onSubmit)} className={layout.layout} >
      <Stack direction={"column"} spacing={5} alignItems={"center"}>
        <Title text="Modificar cliente"/>

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
            defaultValue={client?.name}
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={errors.name && "Este campo es requerido"}
          />
          <TextField
            id="location"
            label="Ubicación"
            variant="outlined"
            defaultValue={client?.location}
            {...register("location", { required: true })}
            error={!!errors.location}
            helperText={errors.location && "Este campo es requerido"}
          />
          <TextField
            id="phone"
            label="Teléfono"
            variant="outlined"
            defaultValue={client?.phone}
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
            defaultValue={client?.email}
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email && "Este campo es requerido"}
          />
          <TextField
            id="whatsapp"
            label="WhatsApp"
            variant="outlined"
            defaultValue={client?.whatsapp}
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

export default clientUpdate;