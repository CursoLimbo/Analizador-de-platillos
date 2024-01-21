import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { AppButton } from "components/Button";
import Title from "components/Title";
import RichTextEditor from "components/richTextEditor";
import React from "react";
import { useForm } from "react-hook-form";
import layout from '../styles/layout.module.css'


interface QuoteRegisterProps {
  amountOfPeople: string;
  bankAccounts: string;
  client: string;
  code: string;
  company: string;
  date: string;
  develop: string;
  discount: string;
  recipes: string;
  total: string;
  typeOfQuotation: string;
}

const quoteRegister: React.FC<QuoteRegisterProps> = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleSelect = () => {};
  const handleSetText = () => {};
  const onSubmmit=()=>{}

  return (
    <Stack alignItems={"center"} className={layout.layout}>
      <Title text="Crear Cotización" />

      <form onSubmit={handleSubmit(onSubmmit)} >
        <Stack alignItems={"center"} my={5}>
          <Stack width={450}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipo de cotización
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                label="CotizacionTipo"
                onChange={handleSelect}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <Stack
          flexDirection={"row"}
          gap={5}
          flexWrap={"wrap"}
          width={"fullWidth"}
          justifyContent={"center"}
        >
          <Stack width={250} gap={5}>
            <TextField
              id="client"
              label="Cliente"
              variant="outlined"
              {...register("client", { required: true })}
              error={!!errors.client}
              helperText={errors.client && "Este campo es requerido"}
            />{" "}
            <TextField
              id="cantPeople"
              label="Cantidad de personas"
              variant="outlined"
              {...register("cantPeople", { required: true })}
              error={!!errors.cantPeople}
              helperText={errors.cantPeople && "Este campo es requerido"}
            />{" "}
            <TextField
              id="endHour"
              label="Hora finalización"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              type="time"
              {...register("endHour", { required: true })}
              error={!!errors.endHour}
              helperText={errors.endHour && "Este campo es requerido"}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Recetas</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                label="Recetas"
                onChange={handleSelect}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack width={250} gap={5}>
            <TextField
              id="dateQuote"
              label="Fecha cotización"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              type="date"
              {...register("dateQuote", { required: true })}
              error={!!errors.dateQuote}
              helperText={errors.dateQuote && "Este campo es requerido"}
            />
            <TextField
              id="startDate"
              label="Fecha inicio"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              type="date"
              {...register("startDate", { required: true })}
              error={!!errors.startDate}
              helperText={errors.startDate && "Este campo es requerido"}
            />
            <TextField
              id="modality"
              label="Modalidad"
              variant="outlined"
              {...register("modality", { required: true })}
              error={!!errors.modality}
              helperText={errors.modality && "Este campo es requerido"}
            />
            <TextField
              id="totalCost"
              label="Precio total"
              variant="outlined"
              {...register("totalCost", { required: true })}
              error={!!errors.totalCost}
              helperText={errors.totalCost && "Este campo es requerido"}
            />
          </Stack>
          <Stack width={250} gap={5}>
            <TextField
              id="code"
              label="Codigo"
              variant="outlined"
              {...register("code", { required: true })}
              error={!!errors.code}
              helperText={errors.code && "Este campo es requerido"}
            />
            <TextField
              id="startHour"
              label="Hora de inicio"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              type="time"
              {...register("startHour", { required: true })}
              error={!!errors.startHour}
              helperText={errors.startHour && "Este campo es requerido"}
            />
            <TextField
              id="link"
              label="Enlace"
              variant="outlined"
              {...register("link", { required: true })}
              error={!!errors.link}
              helperText={errors.link && "Este campo es requerido"}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Descuento</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                label="Descuento"
                onChange={handleSelect}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <Stack my={5}>
          <RichTextEditor
            handleSetText={handleSetText}
            contextText={""}
            placeHolder={""}
          />
        </Stack>
        <Stack alignItems={"center"}>
          <AppButton>Guardar</AppButton>
        </Stack>
      </form>
    </Stack>
  );
};

export default quoteRegister;
