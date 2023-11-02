import { Stack, TextField } from "@mui/material";
import { AppButton } from "components/Button";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";
import { useCreateDiscountMutation } from "../hooks/services/Discounts";
import React from "react";
import { useForm } from "react-hook-form";

type DiscountFormatData = {
    name: string;
    percentage: number;
    description: string;
};

const discountRegister: React.FC= () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<DiscountFormatData>();
    const [mutate] = useCreateDiscountMutation();

    const onSubmit = async (data: DiscountFormatData) => {
        const percentage = parseFloat(data.percentage);
        const newDiscounts : DiscountFormatData = {
            name: data.name,
            percentage: percentage,
            description: data.description,
        };
    
        const confirm = await ConfirmAlert();
    
        if (confirm) {
          console.log(newDiscounts);
          mutate({ variables: { newDiscount: newDiscounts } })
            .then((response) => {
              SuccessAlert("Descuento registrado exitosamente");
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
              ErrorAlert("Descuento no registrado");
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
          <h1>Registrar descuento</h1>
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
            id="percentage"
            label="Cantidad (Porcentaje)"
            variant="outlined"
            {...register("percentage", { required: true })}
            error={!!errors.percentage}
            helperText={errors.percentage && "Este campo es requerido"}
          />
          <TextField
            id="description"
            label="Descripción"
            variant="outlined"
            {...register("description", { required: true })}
            error={!!errors.description}
            helperText={errors.description && "Este campo es requerido"}
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

export default discountRegister;




