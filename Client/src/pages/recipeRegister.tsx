import React, { useEffect, useState } from "react";
import { Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useCreateRecipeMutation } from "hooks/services/Recipe";
import { useContextData } from "hooks/utils/contextIngredients";
import RichTextEditor from "components/richTextEditor";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";
import { AppButton } from "components/Button";

type RecipeFormatdata = {
  name: string;
  portions: number;
  procedure: string;
  ingredients: string[];
};

const RecipeRegister: React.FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RecipeFormatdata>();
  const [mutate] = useCreateRecipeMutation();
  const router = useRouter();
  const { ingredientsIDsArray, setIngredientsIDsArray, Recipe, setRecipe } =
    useContextData();
  const [procedure, setProcedure] = useState("");
  const [contextText, setContextText] = useState("");
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);

  const handleSetText = (text: string) => {
    setProcedure(text);
  };

  useEffect(() => {
    let tempIngredients = [...ingredientsIDsArray];
    console.log('context recipe: '+tempIngredients[0].name)
    // setIngredients(tempIngredients);
  }, [ingredientsIDsArray]);

  const nameRecipe = watch("name", "");
  const portions = watch("portions", 0);

  const handleSelectIngredients = () => {
    RecipeContext();
    router.push("/addIngredientsToRecipe");
  };

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
      console.log(Recipe.procedure);
      setContextText(Recipe.procedure);
    }
  }, [Recipe]);

  const clearContext = () => {
    const clearContext: RecipeIngredient[] = [];
    setIngredientsIDsArray(clearContext);
  };

  const onSubmit = async (data: RecipeFormatdata) => {
    const newRecipes: RecipeFormatdata = {
      name: data.name,
      portions: Number(data.portions),
      procedure: procedure,
      ingredients: [''],
      // ingredients: ingredients,
    };

    const confirm = await ConfirmAlert();

    if (confirm) {
      console.log(newRecipes);
      // mutate({ variables: { newRecipe: newRecipes } })
      //   .then((response) => {
      //     SuccessAlert("Receta registrada exitosamente");
      //     clearContext();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     ErrorAlert("Receta no registrada");
      //   });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"column"} spacing={5} alignItems={"center"}>
        <Stack
          alignItems={"center"}
          fontFamily={"Times New Roman"}
          fontSize={28}
        >
          <h1>Registrar receta</h1>
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
    </form>
  );
};

export default RecipeRegister;
