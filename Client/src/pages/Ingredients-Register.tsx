import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import ingredientsRegisterStyles from "../styles/Ingredients-register.module.css";
import {
  Stack,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { AppButton } from "../components/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { useGetAllSupplierQuery } from "../hooks/services/Supplier";
import { useCreateIngredientMutation } from "../hooks/services/Ingredients";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";
import { useRouter } from "next/router";
import { weigthUnit } from "hooks/utils/DataUnits";

type IngredientFormData = {
  name: string;
  brand:string
  unit: string;
  presentation: number;
  cost: number;
  supplier: string;
  costPerGram: number;
  performance: number;
  performancePercentage: number;
  mermado: number;

};

const IngredientsRegister: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IngredientFormData>();

  const [mutate] = useCreateIngredientMutation();
  const Router = useRouter();

  //read form data
  const cost = watch("cost", 0);
  const presentation = watch("presentation", 0);
  const performance = watch("performance", 0);
  const costPerGram = watch("costPerGram", 0);
  const performancePercentage = watch("performancePercentage", 0);
  const [unitCalc,setUnitCalc] = useState(1);
  //calc gramPrice
  useEffect(() => {
    if (cost > 0 && presentation > 0) {
      const valCostPerGram = cost / (presentation * unitCalc);
      setValue("costPerGram", Number(valCostPerGram.toFixed(4)));
    } else {
      setValue("costPerGram", 0);
    }
  }, [cost, presentation,unitCalc]);

  //calc performance percent
  useEffect(() => {
    if (performance > 0) {
      const valPerformacePercent = performance / 100;
      setValue("performancePercentage", valPerformacePercent);
    } else {
      setValue("performancePercentage", 0);
    }
  }, [performance]);
  //calc mermado
  useEffect(() => {
    if (costPerGram > 0 && performancePercentage > 0) {
      const valmermado = Number(
        (costPerGram * performance / 100).toFixed(4)
      );

      setValue("mermado", valmermado);
    } else {
      setValue("mermado", 0);
    }
  }, [performance,costPerGram]);



  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const { data: suppliersData, loading: suppliersLoading } =
    useGetAllSupplierQuery();

    useEffect(()=>{
      setUnitCalc(weigthUnit[selectedUnit])
    },[selectedUnit])

  const onSubmit = async (data: IngredientFormData) => {
    const newIngredient : IngredientFormData = {
      name: data.name,
      brand:data.brand,
      unit: data.unit,
      presentation: Number(data.presentation),
      cost: Number(data.cost),
      supplier: data.supplier,
      costPerGram: data.costPerGram,
      performance: Number(data.performance),
      performancePercentage: data.performancePercentage,
      mermado: data.mermado,

    }


    const confirm = await ConfirmAlert();
    if (confirm) {
      mutate({ variables: { newIngredient: newIngredient } })
        .then((response) => {
          SuccessAlert("Ingrediente registrado exitosamente");
          Router.push("/ingredients");
        })
        .catch((error) => {
          ErrorAlert("Ingrediente no registrado");
        });
      console.log(newIngredient)
    }
  };

  return (
    <div className={ingredientsRegisterStyles.box}>
      <h1 className={ingredientsRegisterStyles.title}>Registrar ingrediente</h1>
      <form
        className={ingredientsRegisterStyles.formData}
        onSubmit={handleSubmit(onSubmit)}
      >
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
<FormControl
  className={ingredientsRegisterStyles.FormControlRoot}
  error={!!errors.unit}
>
  <InputLabel id="unit-label">Unidad</InputLabel>
  <Select
    labelId="unit-label"
    id="IngUnit"
    label="Unidad"
    value={selectedUnit}
    {...register("unit", { required: true })}
    onChange={(e: SelectChangeEvent) => setSelectedUnit(e.target.value)}
    
    
  >
    {suppliersLoading ? (
      <MenuItem value="">Loading...</MenuItem>
    ) : (
      Object.keys(weigthUnit).map((unit: string) => (
        <MenuItem key={unit} value={unit}>
          {unit}
        </MenuItem>
      ))
    )}
  </Select>
  {errors.unit && (
    <FormHelperText>Este campo es requerido</FormHelperText>
  )}
</FormControl>

            <TextField
              id="IngFormat"
              label="Presentación"
              variant="outlined"
              type="decimal"
              className={ingredientsRegisterStyles.TextFieldRoot}
              {...register("presentation", { required: true })}
              error={!!errors.presentation}
              helperText={errors.presentation && "Este campo es requerido"}
            />
            <TextField
              id="IngPrice"
              label="Precio"
              variant="outlined"

              type="decimal"
              className={ingredientsRegisterStyles.TextFieldRoot}
              {...register("cost", { required: true })}
              error={!!errors.cost}
              helperText={errors.cost && "Este campo es requerido"}
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
                onChange={(e: SelectChangeEvent) =>
                  setSelectedSupplier(e.target.value)
                }
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
              id="brand"
              label="Marca"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              {...register("brand", { required: true })}
              error={!!errors.brand}
              helperText={errors.brand && "Este campo es requerido"}
            />
            <TextField
              id="GramPrice"
              label="Precio(g)"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
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
              {...register("performance", { required: true })}
              error={!!errors.performance}
              helperText={errors.performance && "Este campo es requerido"}
            />
            <TextField
              id="PerformancePercentage"
              label="Porcentaje de rendimiento"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
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
              InputProps={{
                readOnly: true,
              }}
              {...register("mermado")}
            />
          </Stack>
        </Stack>
        <Stack className={ingredientsRegisterStyles.btn}>
          <AppButton
            className={ingredientsRegisterStyles.btnSave}
            type="submit"
          >
            Guardar
          </AppButton>
        </Stack>
      </form>
    </div>
  );
};

export default IngredientsRegister;
