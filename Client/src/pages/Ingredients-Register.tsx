import React, { useState, useEffect } from "react";
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
import { useGetAllSupplierQuery } from "@/hooks/services/Supplier";
import { useCreateIngredientMutation } from "@/hooks/services/Ingredients";

type IngredientFormData = {
  name: string;
  format: number;
  price: number;
  supplier: string;
  gramPrice: number;
  yield: string;
  yieldPercent: number;
  depletePrice: number;
  priceX2: number;
};

const IngredientsRegister: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IngredientFormData>();

  const [mutate] = useCreateIngredientMutation();


  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [shouldCalculateGramPrice, setShouldCalculateGramPrice] = useState(false);
  const [shouldCalculateYieldPercent, setShouldCalculateYieldPercent] = useState(false);
  const [shouldCalculateDepletedPrice, setShouldCalculateDepletedPrice] = useState(false);
  const [shouldCalculatePriceX2, setShouldCalculatePriceX2] = useState(false);
  const { data: suppliersData, loading: suppliersLoading } = useGetAllSupplierQuery();

  //read form data
  const price = watch('price',0);
  const format = watch('format',0);
// validation for calculated fields
  useEffect(() => {
    if (price && format) {
      setShouldCalculateGramPrice(true);
    } else {
      setShouldCalculateGramPrice(false);
    }
  }, [price, format]);
  


  const onSubmit = (data: IngredientFormData) => {
    mutate({ variables: { newIngredient : data}})
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
    console.log(data);
  };

  const calculateGramPrice = () => {
    return price / format;
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
            <FormControl className={ingredientsRegisterStyles.FormControlRoot} error={!!errors.supplier}>
              <InputLabel id="Supplier-label">Proveedor</InputLabel>
              <Select
                labelId="Supplier-label"
                id="IngSupplier"
                label="Proveedor"
                value={selectedSupplier}
                {...register("supplier", { required: true })}
                onChange={(e: SelectChangeEvent) => setSelectedSupplier(e.target.value)}
              >
                {suppliersLoading ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  suppliersData &&
                  suppliersData.GetAllSuppliers.map((supplier: any) => (
                    <MenuItem key={supplier.id} value={supplier.name}>
                      {supplier.name}
                    </MenuItem>
                  ))
                )}
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
              value={shouldCalculateGramPrice ? calculateGramPrice() : ""}
              {...register("gramPrice")}
            />
            <TextField
              id="IngYield"
              label="Rendimiento"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              {...register("yield", { required: true })}
              error={!!errors.yield}
              helperText={errors.yield && "Este campo es requerido"}
            />
            <TextField
              id="YieldPercent"
              label="Porcentaje de rendimiento"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              InputProps={{
                readOnly: true,
              }}
              {...register("yieldPercent")}
            />
            <TextField
              id="DepletedPrice"
              label="Precio mermado"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              InputProps={{
                readOnly: true,
              }}
              {...register("depletePrice")}
            />
            <TextField
              id="PriceX2"
              label="Precio x 2"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              InputProps={{
                readOnly: true,
              }}
              {...register("priceX2")}
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
