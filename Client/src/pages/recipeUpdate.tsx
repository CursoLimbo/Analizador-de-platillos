import React, { useEffect, useState } from "react";
import { Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useGetRecipeById, useUpdateRecipeMutation } from "hooks/services/Recipe";
import { useContextData } from "hooks/utils/contextIngredients";
import RichTextEditor from "components/richTextEditor";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";
import { AppButton } from "components/Button";
import Ingredients from "./ingredients";

type RecipeFormatdata = {
  id:string;
  name: string;
  portions: number;
  procedure: string;
  ingredients: RecipeIngredient[];
  version: string
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
  const { data: recipeData, loading: recipeLoading } =useGetRecipeById(id);
  const [mutate] = useUpdateRecipeMutation();
  const { ingredientsIDsArray, setIngredientsIDsArray, Recipe, setRecipe } =
    useContextData();
  const [recipeinfo,SetRecipeInfo] = useState<RecipeFormatdata | undefined >(undefined);
  const [procedure, setProcedure] = useState("");
  const [contextText, setContextText] = useState("");
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [confirmData, setConfirmData] = useState(false);



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
  const version = watch("version", "")

  const handleSelectIngredients = () => {
    RecipeContext();
    router.push("/addIngredientsToRecipe");
  };

  const RecipeContext = () => {
    const newRecipe = {
      name: nameRecipe,
      portions: Number(portions),
      procedure: procedure,
      version: version,
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
    if (Recipe.version !== "") {
      setValue("version", Recipe.version);
    }
    if (Recipe.procedure !== "") {
      setContextText(Recipe.procedure);
    }
  }, [Recipe]);

  useEffect(() => {
    if(recipeinfo!== undefined && confirmData && ingredients.length===0 ){
    setValue("name", recipeinfo.name);
    setValue("portions", recipeinfo.portions);
    setValue("version", recipeinfo.version);
    setContextText(recipeinfo.procedure);
    const ingredientsData = recipeinfo.ingredients
      .map(ingredient => ({
        idIngredient: ingredient.idIngredient,
        nameIngredient: ingredient.nameIngredient,
        quantity: ingredient.quantity,
      }));
    setIngredientsIDsArray(ingredientsData)
    }
  },[recipeinfo])

  const clearContext = () => {
    const clearContext: RecipeIngredient[] = [];
    setIngredientsIDsArray(clearContext);
  };

  const onSubmit = async (data: RecipeFormatdata) => {
    const newRecipes: RecipeFormatdata = {
      id : id,
      name: data.name,
      portions: Number(data.portions),
      procedure: procedure,
      ingredients: ingredients,
      version: version,
    };

    const confirm = await ConfirmAlert();
    if(ingredients.length>0){
      if (confirm) {
        mutate({ variables: {   updateRecipe: newRecipes } })
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
    }else{
      ErrorAlert("Debe agregar ingredientes");
    }

  };

  return (

    

    <form onSubmit={handleSubmit(onSubmit)}>
      {confirmData  ? (
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
            id="version"
            label="Version"
            variant="outlined"
            type="string"
            {...register("version", { required: false })}
            error={!!errors.version}
            helperText={errors.portions && "Este campo es requerido"}
          />
          <TextField
            id="recipeCostTotal"
            label="Costo Total"
            variant="outlined"
            type="number"
            defaultValue={0}
            InputProps={{
              readOnly: true,
            }}
          />

        </Stack>
        <Stack width={600} height={200}>
          <Stack margin={1} alignItems={"start"}>
            <AppButton onClick={handleSelectIngredients}>
              + Ingredientes
            </AppButton>
          </Stack>
          <RichTextEditor
            handleSetText={handleSetText}
            contextText={contextText}
          />
        </Stack>
        <Stack>
          <AppButton type="submit">Guardar</AppButton>
        </Stack>
      </Stack>
      ) :null}
    </form>
  );
};

export default RecipeRegister;
