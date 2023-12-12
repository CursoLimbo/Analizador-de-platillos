import { Stack, TextField } from "@mui/material";
import { AppButton } from "components/Button";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";
import { useCreateSupplierMutation } from "../hooks/services/Supplier";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";


type SupplierFormatData = {
    name: string;
    location: string;
    phone: string;
};

const supplierRegister: React.FC= () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<SupplierFormatData>();
    const [mutate] = useCreateSupplierMutation();
    const router = useRouter();

    const onSubmit = async (data: SupplierFormatData) => {
        const newSuppliers : SupplierFormatData = {
            name: data.name,
            location: data.location,
            phone: data.phone,    
        };
    
        const confirm = await ConfirmAlert();
    
        if (confirm) {
          console.log(newSuppliers);
          mutate({ variables: { newSupplier: newSuppliers } })
            .then((response) => {
              SuccessAlert("Proveedor registrado exitosamente");
              router.push("/suppliers");
            })
            .catch((error) => {
              console.log(error);
              ErrorAlert("Proveedor no registrado");
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
          <h1>Registrar proveedor</h1>
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

        </Stack>

        <Stack>
          <AppButton type="submit">Guardar</AppButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default supplierRegister;