import React, {useState} from "react";
import { Footer } from "@/components/Footer";
import { NavBar } from '@/components/NavBar';
import ingredientsRegisterStyles from "@/styles/ingredients-register.module.css";
import {
  Stack,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { AppButton } from "@/components/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useForm } from "react-hook-form";

type IngredientFormData = {
  name: string;
  format: string;
  price: string;
  supplier: string;
  yield: string;
};

const IngredientsRegister: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IngredientFormData>();

  const onSubmit = (data: IngredientFormData) => {
    // Process the form data here
    console.log(data);
  };

  return (
    <>
      <NavBar isHome={false} />
      <h1 className={ingredientsRegisterStyles.title}>Registrar ingrediente</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          className={ingredientsRegisterStyles.RowContainer}
          direction={"row"}
          spacing={5}
        >
          <Stack
            className={ingredientsRegisterStyles.IngredientInputs}
            direction={"column"}
            spacing={5}
          >
            <TextField
              id="IngName"
              label="Nombre del artículo"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              {...register("name", { required: true })}
              error={!!errors.name}
              helperText={errors.name && "Este campo es requerido"}
            />
            <TextField
              id="IngFormat"
              label="Presentación"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              {...register("format", { required: true })}
              error={!!errors.format}
              helperText={errors.format && "Este campo es requerido"}
            />
            <TextField
              id="IngPrice"
              label="Precio"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              {...register("price", { required: true })}
              error={!!errors.price}
              helperText={errors.price && "Este campo es requerido"}
            />
            <FormControl className={ingredientsRegisterStyles.FormControlRoot}>
              <InputLabel id="Supplier-label">Proveedor</InputLabel>
                <Select
                  labelId="Supplier-label"
                  id="IngSupplier"
                  {...register("supplier", { required: true })}
                  error={!!errors.supplier}
                >
                  <MenuItem value="maxiPali">Maxi Pali</MenuItem>
                  <MenuItem value="miCasa">Mi Casa</MenuItem>
                </Select>

              {errors.supplier && (
                <FormHelperText>Este campo es requerido</FormHelperText>
              )}
            </FormControl>
          </Stack>

          <Stack style={{ width: "20px" }} />

          <Stack
            className={ingredientsRegisterStyles.IngredientOutputs}
            direction={"column"}
            spacing={5}
          >
            <TextField
              id="GramPrice"
              label="Precio por gramo"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="IngYield"
              label="Redimiento"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              {...register("yield")}
            />
            <TextField
                id="DepletedPrice"
                label="Precio mermado"
                variant="outlined"
                className={ingredientsRegisterStyles.TextFieldRoot}
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="PriceX2"
                label="Precio x 2"
                variant="outlined"
                className={ingredientsRegisterStyles.TextFieldRoot}
                InputProps={{
                    readOnly: true,
                }}
            />   
          </Stack>
        </Stack>
        <Stack className={ingredientsRegisterStyles.btn}>
          <AppButton className={ingredientsRegisterStyles.btnSave} type="submit">
            Guardar
          </AppButton>
        </Stack>
      </form>
      <Footer />
    </>
  );
};

export default IngredientsRegister;
