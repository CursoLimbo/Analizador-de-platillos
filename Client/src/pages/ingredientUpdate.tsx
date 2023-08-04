import React, { useEffect, useState } from "react";
import { useGetIngredientById, useUpdateIngredientMutation } from "../hooks/services/Ingredients";
import { useRouter } from "next/router";
import {
    Stack,
    TextField,
    FormControl,
    MenuItem,
    InputLabel,
    FormHelperText,
  } from "@mui/material";
  import ingredientsRegisterStyles from "../styles/Ingredients-register.module.css";
  import { AppButton } from "../components/Button";
import { useForm } from "react-hook-form";
import Select, { SelectChangeEvent } from "@mui/material/Select";



type IngredientFormData = {
  id: string;
  name: string;
  presentation: number;
  supplier: string;
  costPerGram: number;
  performance: number;
  performancePercentage: number;
  mermado: number;
  productMultiplyByTwo: number;
};

const IngredientUpdate: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
      } = useForm<IngredientFormData>();
  const router = useRouter();
  const { idUpdate } = router.query;
  const [id, setId] = useState<string>('');
  const [ingredient, setIngredient] = useState<IngredientFormData | undefined>(undefined);

  useEffect(() => {
    if (typeof idUpdate === "string") {
      setId(idUpdate);
      console.log('soy id: ' + idUpdate);
    }
  }, [idUpdate]);

  const { data: ingredientData, loading: ingredientLoading } = useGetIngredientById(id);

  useEffect(() => {
    if (ingredientData && !ingredientLoading) {
      setIngredient(ingredientData.getIngredient);
      console.log('soy data:', ingredientData.getIngredient);
    }
  }, [ingredientData, ingredientLoading]);

  const onSubmit = (data: IngredientFormData) => {

    };




  return (
    <div className={ingredientsRegisterStyles.box}>
      <h1 className={ingredientsRegisterStyles.title}>Registrar ingrediente</h1>
      <form className={ingredientsRegisterStyles.formData} onSubmit={handleSubmit(onSubmit)}>
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
              value={ingredient?.name}
              {...register("name", { required: true })}
              error={!!errors.name}
              helperText={errors.name && "Este campo es requerido"}
            />
            <TextField
              id="IngFormat"
              label="Presentación"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              value={ingredient?.presentation}
              {...register("presentation", { required: true })}
              error={!!errors.presentation}
              helperText={errors.presentation && "Este campo es requerido"}
            />
            {/* <TextField
              id="IngPrice"
              label="Precio"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              {...register("price", { required: true })}
              error={!!errors.price}
              helperText={errors.price && "Este campo es requerido"}
            /> */}
            {/* <FormControl
              className={ingredientsRegisterStyles.FormControlRoot}
              error={!!errors.supplier}
            >
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
            </FormControl> */}
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
              value={ingredient?.costPerGram}
              InputProps={{
                readOnly: true,
              }}
              {...register("costPerGram")}
            />
            <TextField
              id="IngPerformance"
              label="Rendimiento"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              value={ingredient?.performance}
              {...register("performance", { required: true })}
              error={!!errors.performance}
              helperText={errors.performance && "Este campo es requerido"}
            />
            <TextField
              id="PerformancePercentage"
              label="Porcentaje de rendimiento"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              value={ingredient?.performancePercentage}
              InputProps={{
                readOnly: true,
              }}
              {...register("performancePercentage")}
            />
            <TextField
              id="DepletedPrice"
              label="Precio mermado"
              variant="outlined"
              value={ingredient?.mermado}
              className={ingredientsRegisterStyles.TextFieldRoot}
              InputProps={{
                readOnly: true,
              }}
              {...register("mermado")}
            />
            <TextField
              id="ProductoX2"
              label="Producto x 2"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              value={ingredient?.productMultiplyByTwo}
              InputProps={{
                readOnly: true,
              }}
              {...register("productMultiplyByTwo")}
            />
          </Stack>
        </Stack>
        <Stack className={ingredientsRegisterStyles.btn}>
          <AppButton className={ingredientsRegisterStyles.btnSave} type="submit">
            Guardar
          </AppButton>
        </Stack>
      </form>
    </div>
  );
};

export default IngredientUpdate;
