import React, { useEffect, useState } from "react";
import { Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { set, useForm } from "react-hook-form";
import {
  useGetRecipeById,
  useUpdateRecipeMutation,
} from "hooks/services/Recipe";
import { useContextData } from "hooks/utils/contextIngredients";
import RichTextEditor from "components/richTextEditor";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";
import { AppButton } from "components/Button";

type RecipeFormatdata = {
  id: string;
  name: string;
  portions: number;
  procedure: string;
  ingredients: RecipeIngredient[];
  PercentageInflation: number;
  salesTax: number;
  serviceTax: number;
  utilities: number;
  revenue: number;
};

const RecipeRegister: React.FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RecipeFormatdata>();
  const router = useRouter();
  const [id, setId] = useState<string>("");
  const { idUpdate } = router.query;
  const { data: recipeData, loading: recipeLoading } = useGetRecipeById(id);
  const [mutate] = useUpdateRecipeMutation();
  const {
    ingredientsIDsArray,
    setIngredientsIDsArray,
    Recipe,
    setRecipe,
    costConf,
    setCostConf,
  } = useContextData();
  const [recipeinfo, SetRecipeInfo] = useState<RecipeFormatdata | undefined>(
    undefined
  );
  const [procedure, setProcedure] = useState("");
  const [contextText, setContextText] = useState("");
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [confirmData, setConfirmData] = useState(false);
  const[totalCost,setTotalCost]=useState(0)

  useEffect(() => {
    if (typeof idUpdate === "string") {
      setId(idUpdate);
    }
  }, [idUpdate]);

  useEffect(() => {
    if (recipeData && !recipeLoading) {
      SetRecipeInfo(recipeData.getRecipe);
      setConfirmData(true);
    }
  }, [recipeData, recipeLoading]);

  const handleSetText = (text: string) => {
    setProcedure(text);
  };

  useEffect(() => {
    let tempIngredients = [...ingredientsIDsArray];
    setIngredients(tempIngredients);
  }, [ingredientsIDsArray]);

  const nameRecipe = watch("name", "");
  const portions = watch("portions", 0);

  const handleSelectIngredients = () => {
    RecipeContext();
    router.push("/addIngredientsToRecipe");
  };

  const handleConfigCosts=()=>{
    RecipeContext()

    router.push("/costRecipeConf");
  }

  const RecipeContext = () => {
    const newRecipe = {
      name: nameRecipe,
      portions: Number(portions),
      procedure: procedure,
    };

    setRecipe(newRecipe);
  };

  useEffect(() => {
    if (Recipe.name !== "") {
      setValue("name", Recipe.name);
    }

    if (Recipe.portions !== 0) {
      setValue("portions", Recipe.portions);
    }
    if (Recipe.procedure !== "") {
      setContextText(Recipe.procedure);
    }
  }, [Recipe]);

  useEffect(() => {
    if (recipeinfo !== undefined && confirmData && ingredients.length === 0) {
      setValue("name", recipeinfo.name);
      setValue("portions", recipeinfo.portions);
      setContextText(recipeinfo.procedure);
      const ingredientsData = recipeinfo.ingredients.map((ingredient) => ({
        idIngredient: ingredient.idIngredient,
        nameIngredient: ingredient.nameIngredient,
        quantity: ingredient.quantity,
      }));
      setIngredientsIDsArray(ingredientsData);
      setCostConf({
        inflation: recipeinfo.PercentageInflation,
        IVA: recipeinfo.salesTax,
        ISA: recipeinfo.serviceTax,
        utilities: recipeinfo.utilities,
        profits: recipeinfo.revenue,
      });
    }
  }, [recipeinfo]);

  const clearContext = () => {
    const clearContext: RecipeIngredient[] = [];
    setIngredientsIDsArray(clearContext);
  };

useEffect(()=>{
    let recipeCost=0
    let IVA=0
    let ISA=0
    let Util=0
    let profit=0
    let inflation=0;

    if (recipeinfo) {
      inflation = recipeinfo.PercentageInflation;
      IVA = recipeinfo.salesTax;
      ISA = recipeinfo.serviceTax;
      Util = recipeinfo.utilities;
      profit = recipeinfo.revenue;
    } else {
      inflation = costConf.inflation;
      IVA = costConf.IVA;
      ISA = costConf.ISA;
      Util = costConf.utilities;
      profit = costConf.profits;
    } 
    let totalCost= recipeCost *((inflation/100)+1)
    totalCost*=((Util/100)+1)
    totalCost*=((profit/100)+1)
    totalCost*=((IVA/100)+1)
    totalCost*=((ISA/100)+1)
    setTotalCost(Number(totalCost.toFixed(2)))
},[contextText,recipeinfo])


  const onSubmit = async (data: RecipeFormatdata) => {
    const newRecipes: RecipeFormatdata = {
      id: id,
      name: data.name,
      portions: Number(data.portions),
      procedure: procedure,
      ingredients: ingredients,
      PercentageInflation: costConf.inflation,
      salesTax: costConf.IVA,
      serviceTax: costConf.ISA,
      utilities: costConf.utilities,
      revenue: costConf.profits,
    };

    const confirm = await ConfirmAlert();
    if (ingredients.length > 0) {
      if (confirm) {
        mutate({ variables: { updateRecipe: newRecipes } })
          .then((response) => {
            SuccessAlert("Receta actualizada exitosamente");
            clearContext();
            router.push("/recipes");
          })
          .catch((error) => {
            console.log("Mensaje de error:", error.message);
            console.log("Errores detallados:", error.graphQLErrors);
            console.log("Errores de red:", error.networkError);
            ErrorAlert("Receta no registrada");
          });
      }
    } else {
      ErrorAlert("Debe agregar ingredientes");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {confirmData ? (
        <Stack direction={"column"} spacing={5} alignItems={"center"}>
          <Stack
            alignItems={"center"}
            fontFamily={"Times New Roman"}
            fontSize={28}
          >
            <h1>Actualizar receta</h1>
          </Stack>

          <Stack
            direction={"column"}
            spacing={5}
            width={300}
            alignItems={"center"}
          >
            <TextField
              id="recipeName"
              label="Nombre de la receta"
              variant="outlined"
              {...register("name", { required: true })}
              error={!!errors.name}
              helperText={errors.name && "Este campo es requerido"}
            />

            <TextField
              id="recipeCant"
              label="Porciones"
              variant="outlined"
              type="number"
              {...register("portions", { required: true })}
              error={!!errors.portions}
              helperText={errors.portions && "Este campo es requerido"}
            />

            <TextField
              id="recipeCostTotal"
              label="Costo Total"
              variant="outlined"
              type="number"
              defaultValue={totalCost}
              InputProps={{
                readOnly: true,
              }}
            />
          </Stack>
          <Stack width={600}>
            <Stack
              width={580}
              margin={1}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <AppButton onClick={handleSelectIngredients}>
                + Ingredientes
              </AppButton>
              <AppButton onClick={handleConfigCosts}>Costeo</AppButton>
            </Stack>
          </Stack>
          <Stack maxWidth={650}>
          <RichTextEditor
            handleSetText={handleSetText}
            contextText={contextText}
            placeHolder="Procedimiento de la receta"
          />
          </Stack>
          <Stack>
            <AppButton type="submit">Guardar</AppButton>
          </Stack>
        </Stack>
      ) : null}
    </form>
  );
};

export default RecipeRegister;
