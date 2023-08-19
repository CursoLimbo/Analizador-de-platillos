import React, { useEffect, useState } from "react";
import {
  useGetIngredientById,
  useUpdateIngredientMutation,
} from "../hooks/services/Ingredients";
import { useRouter } from "next/router";
import { Stack, TextField, MenuItem } from "@mui/material";
import ingredientsRegisterStyles from "../styles/Ingredients-register.module.css";
import { AppButton } from "../components/Button";
import { useForm } from "react-hook-form";
import { useGetAllSupplierQuery } from "hooks/services/Supplier";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";

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
  const price = watch("price", 0);
  const presentation = watch("presentation", 0);
  const performance = watch("performance", 0);
  const costPerGram = watch("costPerGram", 0);
  const performancePercentage = watch("performancePercentage", 0);
  const supplier = watch("supplier", "");

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
    const valPerformacePercent = performance / 100;
    setValue("performancePercentage", valPerformacePercent);
  }, [performance]);
  //calc mermado and productX2
  useEffect(() => {
    const valmermado = Number((costPerGram * performancePercentage).toFixed(2));
    setValue("mermado", valmermado);
    setValue("productMultiplyByTwo", valmermado * 2);
  }, [performance, costPerGram]);

  const onSubmit = async (data: IngredientFormData) => {
    const { price, ...formData } = data;

    const updatedFormData: Omit<IngredientFormData, "price"> = {
      ...formData,
      presentation: Number(data.presentation),
      performance: Number(data.performance),
      costPerGram: Number(data.costPerGram.toString()),
      performancePercentage: Number(data.performancePercentage.toString()),
      mermado: Number(data.mermado.toString()),
      productMultiplyByTwo: Number(data.productMultiplyByTwo.toString()),
      supplier: data.supplier.toString(),
      id: id,
    };
    const confirm = await ConfirmAlert();
    if (confirm) {
      mutate({ variables: { updateIngredient: updatedFormData } })
        .then((response) => {
          SuccessAlert("Ingrediente actualizado exitosamente");
          router.push(`/ingredients?Update=${encodeURIComponent('true')}`)
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("Ingrediente no actualizado");
        });
    }
  };

  return (
    <div className={ingredientsRegisterStyles.box}>
      <h1 className={ingredientsRegisterStyles.title}>
        Actualizar ingrediente
      </h1>
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
                    ingredient?.presentation && ingredient?.costPerGram // Verifica si ambos valores tienen datos
                      ? ingredient.presentation * ingredient.costPerGram
                      : ""
                  }
                  {...register("price", { required: true })}
                  error={!!errors.price}
                  helperText={errors.price && "Este campo es requerido"}
                />

                <TextField
                  id="IngSupplier"
                  select
                  label="Proveedor"
                  defaultValue={ingredient?.supplier}
                  {...register("supplier", { required: true })}
                  error={!!errors.price}
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
                <TextField
                  id="ProductoX2"
                  label="Producto x 2"
                  defaultValue={ingredient?.productMultiplyByTwo}
                  InputProps={{
                    readOnly: true,
                  }}
                  {...register("productMultiplyByTwo")}
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
