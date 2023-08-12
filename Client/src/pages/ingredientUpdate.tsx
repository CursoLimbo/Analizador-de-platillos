import React, { useEffect, useState } from "react";
import {
  useGetIngredientById,
  useUpdateIngredientMutation,
} from "../hooks/services/Ingredients";
import { useRouter } from "next/router";
import {
  Stack,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText,
  Container,
} from "@mui/material";
import ingredientsRegisterStyles from "../styles/Ingredients-register.module.css";
import { AppButton } from "../components/Button";
import { useForm } from "react-hook-form";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Ingredients from "./ingredients";

type IngredientFormData = {
  id: string;
  name: string;
  presentation: number;
  supplier: string;
  price: number;
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
  const [id, setId] = useState<string>("");
  const [ingredient, setIngredient] = useState<IngredientFormData | undefined>(
    undefined
  );

  useEffect(() => {
    if (typeof idUpdate === "string") {
      setId(idUpdate);
      console.log("soy id: " + idUpdate);
    }
  }, [idUpdate]);

  const { data: ingredientData, loading: ingredientLoading } =
    useGetIngredientById(id);

  useEffect(() => {
    if (ingredientData && !ingredientLoading) {
      setIngredient(ingredientData.getIngredient);
      console.log("soy data:", ingredientData.getIngredient);
    }
  }, [ingredientData, ingredientLoading]);

  const onSubmit = (data: IngredientFormData) => {};

  //read form data
  const price = watch("price", 0);
  const presentation = watch("presentation", 0);
  const performance = watch("performance", 0);
  const costPerGram = watch("costPerGram", 0);
  const performancePercentage = watch("performancePercentage", 0);

  //calc gramPrice
  useEffect(() => {
    if (price > 0 && presentation > 0) {
      const valCostPerGram = price / presentation;
      setValue("costPerGram", Number(valCostPerGram.toFixed(2)));
    } else {
      setValue("costPerGram", 0);
    }
  }, [price, presentation]);

  //calc performance percent
  useEffect(() => {
    if (performance > 0) {
      const valPerformacePercent = performance / 100;
      setValue("performancePercentage", valPerformacePercent);
    } else {
      setValue("performancePercentage", 0);
    }
  }, [performance]);
  //calc mermado and productX2
  useEffect(() => {
    if (costPerGram > 0 && performancePercentage > 0) {
      const valmermado = Number(
        (costPerGram * performancePercentage).toFixed(2)
      );

      setValue("mermado", valmermado);
      setValue("productMultiplyByTwo", valmermado * 2);
    } else {
      setValue("mermado", 0);
      setValue("productMultiplyByTwo", 0);
    }
  }, [performance]);

  return (
    <div className={ingredientsRegisterStyles.box}>
      <h1 className={ingredientsRegisterStyles.title}>
        Actualizar ingrediente
      </h1>
      <Stack>
        <form className={ingredientsRegisterStyles.formData}>
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
                // onChange={handleInputChange}
                {...register("name", { required: true })}
                error={!!errors.name}
                helperText={errors.name && "Este campo es requerido"}
              />
              <TextField
                id="IngFormat"
                label="Presentación"
                value={ingredient?.presentation}
                // onChange={handleInputChange}
              />
              <TextField
                id="IngPrice"
                label="Precio"
                value={
                  ingredient?.presentation && ingredient?.costPerGram // Verifica si ambos valores tienen datos
                    ? ingredient.presentation * ingredient.costPerGram
                    : ""
                }
                // onChange={handleInputChange}
                {...register("price", { required: true })}
                error={!!errors.price}
                helperText={errors.price && "Este campo es requerido"}
              />
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
                value={ingredient?.costPerGram}

                // onChange={handleInputChange}
              />
              <TextField
                id="IngPerformance"
                label="Rendimiento"
                value={ingredient?.performance}
                // onChange={handleInputChange}
              />
              <TextField
                id="PerformancePercentage"
                label="Porcentaje de rendimiento"
                value={ingredient?.performancePercentage}
                // onChange={handleInputChange}
              />
              <TextField
                id="DepletedPrice"
                label="Precio mermado"
                value={ingredient?.mermado}
                // onChange={handleInputChange}
              />
              <TextField
                id="ProductoX2"
                label="Producto x 2"
                value={ingredient?.productMultiplyByTwo}
                // onChange={handleInputChange}
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
    </div>
  );
};

export default IngredientUpdate;

// onSubmit={handleSubmit}
