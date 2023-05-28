import React, { useState, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
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
  presentation: number;
  price: number;
  supplier: string;
  costPerGram: number;
  performance: number;
  performancePercentage: number;
  mermado: number;
  productMultiplyByTwo: number;
};


const IngredientsRegister: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IngredientFormData>();

  const [mutate] = useCreateIngredientMutation();




  const [costPerGram, setCostPerGram] = useState(0);


    //read form data
    const price = watch("price", 0);
    const presentation = watch("presentation", 0);
    //calc gramPrice
    useEffect(() => {
        setCostPerGram(price/presentation); 
    }, [price, presentation]);


  const [selectedSupplier, setSelectedSupplier] = useState('');
  const { data: suppliersData, loading: suppliersLoading } = useGetAllSupplierQuery();
  
  const onSubmit = (data: IngredientFormData) => {
    const { price, ...formData } = data;
  
    const updatedFormData: Omit<IngredientFormData, 'price'> = {
      ...formData,
      presentation: Number(data.presentation),
      performance: Number(data.performance),
      costPerGram: Number(data.costPerGram.toString()),
      performancePercentage: Number(data.performancePercentage.toString()),
      mermado: Number(data.mermado.toString()),
      productMultiplyByTwo: Number(data.productMultiplyByTwo.toString()),
    };
  
    mutate({ variables: { newIngredient: updatedFormData } })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  
    console.log(updatedFormData);
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
              {...register("presentation", { required: true })}
              error={!!errors.presentation}
              helperText={errors.presentation && "Este campo es requerido"}
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
            <FormControl
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
              value={costPerGram}
              {...register("costPerGram")}
            />
            <TextField
              id="IngYield"
              label="Rendimiento"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              {...register("performance", { required: true })}
              error={!!errors.performance}
              helperText={errors.performance && "Este campo es requerido"}
            />
            <TextField
              id="YieldPercent"
              label="Porcentaje de rendimiento"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              //value={performancePercentage}
              InputProps={{
                readOnly: true,
              }}
              {...register("performancePercentage")}
            />
            <TextField
              id="DepletedPrice"
              label="Precio mermado"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              //value={mermado}
              InputProps={{
                readOnly: true,
              }}
              {...register("mermado")}
            />
            <TextField
              id="PriceX2"
              label="Precio x 2"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              //value={productMultiplyByTwo}
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
      <Footer />
    </>
  );
};

export default IngredientsRegister;
