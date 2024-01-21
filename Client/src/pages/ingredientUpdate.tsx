import React, { useEffect, useState } from "react";
import {
  useGetIngredientById,
  useUpdateIngredientMutation,
} from "../hooks/services/Ingredients";
import { useRouter } from "next/router";
import {
  Stack,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import ingredientsRegisterStyles from "../styles/Ingredients-register.module.css";
import { AppButton } from "../components/Button";
import { useForm } from "react-hook-form";
import { useGetAllSupplierQuery } from "hooks/services/Supplier";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";
import { weigthUnit } from "hooks/utils/DataUnits";
import layout from '../styles/layout.module.css'
import Title from "components/Title";

type IngredientFormData = {
  id: string;
  name: string;
  brand: string;
  unit: string;
  presentation: number;
  cost: number;
  supplier: string;
  costPerGram: number;
  performance: number;
  performancePercentage: number;
  mermado: number;
};

const IngredientUpdate: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IngredientFormData>();
  const [mutate] = useUpdateIngredientMutation();
  const router = useRouter();
  const { idUpdate } = router.query;
  const [id, setId] = useState<string>("");
  const [ingredient, setIngredient] = useState<IngredientFormData | undefined>(
    undefined
  );
  const [confirmData, setConfirmData] = useState(false);

  useEffect(() => {
    if (typeof idUpdate === "string") {
      setId(idUpdate);
    }
  }, [idUpdate]);

  const { data: ingredientData, loading: ingredientLoading } =
    useGetIngredientById(id);

  useEffect(() => {
    if (ingredientData && !ingredientLoading) {
      setIngredient(ingredientData.getIngredient);
      setConfirmData(true);
    }
  }, [ingredientData, ingredientLoading]);
  const { data: suppliersData, loading: suppliersLoading } =
    useGetAllSupplierQuery();

  //read form data
  const cost = watch("cost", 0);
  const presentation = watch("presentation", 0);
  const performance = watch("performance", 0);
  const costPerGram = watch("costPerGram", 0);
  const selectUnit = watch("unit", '');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [unitCalc,setUnitCalc] = useState(1);

  //calc gramPrice
  useEffect(() => {
    if (cost > 0 && presentation > 0) {

      const valCostPerGram = cost / (presentation*unitCalc);
      setValue("costPerGram", Number(valCostPerGram.toFixed(4)));
    }
  }, [cost, presentation,unitCalc,selectedUnit]);

  //calc performance percent
  useEffect(() => {
    const valPerformacePercent = performance / 100;
    setValue("performancePercentage", valPerformacePercent);
  }, [performance,costPerGram]);

  //calc mermado
  useEffect(() => {
    const valmermado = Number((costPerGram * performance/100).toFixed(4));
    setValue("mermado", valmermado);
  }, [performance, costPerGram]);

  useEffect(()=>{
    if(selectUnit !== ''){
      setUnitCalc(weigthUnit[selectUnit])
    }
  },[selectUnit,selectedUnit])


  const onSubmit = async (data: IngredientFormData) => {
    const newIngredient : IngredientFormData = {
      id:id,
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
      mutate({ variables: { updateIngredient: newIngredient } })
        .then((response) => {
          SuccessAlert("Ingrediente actualizado exitosamente");
          router.push(`/ingredients?Update=${encodeURIComponent("true")}`);
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("Ingrediente no actualizado");
        });
    }
  };

  return (
    <div className={`${ingredientsRegisterStyles.box} ${layout.layout}`}>
      <Title text="Actualizar ingrediente"/>
      {confirmData ? (
        <Stack>
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
                  defaultValue={ingredient?.name}
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
                    defaultValue={ingredient?.unit}
                    {...register("unit", { required: true })}
                    onChange={(e: SelectChangeEvent) =>
                      setSelectedUnit(e.target.value)
                    }
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
                  defaultValue={ingredient?.presentation}
                  {...register("presentation", { required: true })}
                  error={!!errors.presentation}
                  helperText={errors.presentation && "Este campo es requerido"}
                />
                <TextField
                  id="IngPrice"
                  label="Precio"
                  defaultValue={
                    ingredient?.cost
                  }
                  {...register("cost", { required: true })}
                  error={!!errors.cost}
                  helperText={errors.cost && "Este campo es requerido"}
                />

                <TextField
                  id="IngSupplier"
                  select
                  label="Proveedor"
                  defaultValue={ingredient?.supplier}
                  {...register("supplier", { required: true })}
                  error={!!errors.cost}
                  helperText={errors.supplier && "Este campo es requerido"}
                  className={ingredientsRegisterStyles.TextFieldRoot}
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
                </TextField>
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
                  defaultValue={ingredient?.brand}
                  {...register("brand", { required: true })}
                  error={!!errors.brand}
                  helperText={errors.brand && "Este campo es requerido"}
                />
                <TextField
                  id="GramPrice"
                  label="Precio por gramo"
                  defaultValue={ingredient?.costPerGram}
                  InputProps={{
                    readOnly: true,
                  }}
                  {...register("costPerGram")}
                />
                <TextField
                  id="IngPerformance"
                  label="Rendimiento"
                  defaultValue={ingredient?.performance}
                  {...register("performance", { required: true })}
                  error={!!errors.performance}
                  helperText={errors.performance && "Este campo es requerido"}
                />
                <TextField
                  id="PerformancePercentage"
                  label="Porcentaje de rendimiento"
                  defaultValue={ingredient?.performancePercentage}
                  InputProps={{
                    readOnly: true,
                  }}
                  {...register("performancePercentage")}
                />
                <TextField
                  id="DepletedPrice"
                  label="Precio mermado"
                  defaultValue={ingredient?.mermado}
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
        </Stack>
      ) : null}
    </div>
  );
};

export default IngredientUpdate;
