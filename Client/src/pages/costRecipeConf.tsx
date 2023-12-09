import React, { useEffect } from "react";
import {
  Stack,
  TextField,
} from "@mui/material";
import { AppButton } from "../components/Button"; 
import { ConfirmAlert } from "../components/sweetAlert"; 
import { useContextData } from "../hooks/utils/contextIngredients";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type CostData = {
  inflation: number;
  IVA: number;
  ISA: number;
  utilities: number;
  profits: number;
};

const CostRecipeConf: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CostData>();
  const router = useRouter();
  const { costConf, setCostConf } = useContextData();

  useEffect(() => {
    if (costConf) {
      setValue("inflation", costConf.inflation);
      setValue("IVA", costConf.IVA);
      setValue("ISA", costConf.ISA);
      setValue("utilities", costConf.utilities);
      setValue("profits", costConf.profits);
    }
  })

  const onSubmit  = async (data: CostData) => {
    const newCostConf: CostData = {
      inflation: Number(data.inflation),
      IVA: Number(data.IVA),
      ISA: Number(data.ISA),
      utilities: Number(data.utilities),
      profits: Number(data.profits),
    };


      setCostConf(newCostConf);
      router.back();

  };

  return (
    <Stack alignItems="center" fontFamily="Times New Roman" fontSize={28}>
      <h1>Costeo Receta</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems="center">
          <Stack width={250} gap={5}>
            <TextField
              id="inflationNumber"
              label="Inflación (%)"
              variant="outlined"
              type="decimal"
              {...register("inflation", { required: true })}
              error={!!errors.inflation}
              helperText={errors.inflation && "Este campo es requerido"}
            />
            <TextField
              id="IVANumber"
              label="Impuesto de Venta (%)"
              variant="outlined"
              type="decimal"
              {...register("IVA", { required: true })}
              error={!!errors.IVA}
              helperText={errors.IVA && "Este campo es requerido"}
            />
            <TextField
              id="ISANumber"
              label="Impuesto de Servicio (%)"
              variant="outlined"
              type="decimal"
              {...register("ISA", { required: true })}
              error={!!errors.ISA}
              helperText={errors.ISA && "Este campo es requerido"}
            />
            <TextField
              id="utilitiesNumber"
              label="Utilidades (%)"
              variant="outlined"
              type="decimal"
              {...register("utilities", { required: true })}
              error={!!errors.utilities}
              helperText={errors.utilities && "Este campo es requerido"}
            />
            <TextField
              id="profitsNumber"
              label="Ganancia (%)"
              variant="outlined"
              type="decimal"
              {...register("profits", { required: true })}
              error={!!errors.profits}
              helperText={errors.profits && "Este campo es requerido"}
            />
          </Stack>
          <Stack marginTop={5}>
            <AppButton type="submit">GUARDAR</AppButton>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default CostRecipeConf;
