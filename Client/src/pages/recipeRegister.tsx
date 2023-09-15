import React, { useEffect, useState } from "react";
import { Stack, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useCreateRecipeMutation } from "hooks/services/Recipe";
import { useContextData } from "hooks/utils/context";
import RichTextEditor from "components/richTextEditor";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";
import { AppButton } from "components/Button";

type RecipeFormatdata = {
  name: string;
  quantity: number;
  procedure: string;
  ingredients: string[];
};

const RecipeRegister: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RecipeFormatdata>();

  const [mutate] = useCreateRecipeMutation();
  const router = useRouter();
  const { ingredientsIDsArray, setIngredientsIDsArray } = useContextData();
  const [procedure, setProcedure] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleSetText = (text: string) => {
    setProcedure(text);
  };

  useEffect(() => {
    let tempIngredients = [...ingredientsIDsArray];
    setIngredients(tempIngredients);
  }, [ingredientsIDsArray]);

  const handleSelectIngredients = () => {
    router.push("/addIngredientsToRecipe");
  };

  const onSubmit = async (data: RecipeFormatdata) => {
    const newRecipes: RecipeFormatdata = {
      name: data.name,
      quantity: Number(data.quantity),
      procedure: procedure,
      ingredients: ingredients,
    };

    const confirm = await ConfirmAlert();

    if (confirm) {
      console.log(newRecipes);
      mutate({ variables: { newRecipe: newRecipes } })
        .then((response) => {
          SuccessAlert("Receta registrada exitosamente");
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("Receta no registrada");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"column"} spacing={5} alignItems={"center"}>
        <Stack alignItems={"center"} fontFamily={"Times New Roman"} fontSize={28}>
          <h1>Registrar receta</h1>
        </Stack>

        <Stack direction={"column"} spacing={5} width={300} alignItems={"center"}>
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
            label="Cantidad (g)"
            variant="outlined"
            type="number"
            {...register("quantity", { required: true })}
            error={!!errors.quantity}
            helperText={errors.quantity && "Este campo es requerido"}
          />
        </Stack>
        <Stack width={600} height={200}>
          <Stack margin={1} alignItems={"start"}>
            <AppButton onClick={handleSelectIngredients}>
              + Ingredientes
            </AppButton>
          </Stack>
          <RichTextEditor handleSetText={handleSetText} />
        </Stack>
        <Stack>
          <AppButton type="submit">Guardar</AppButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default RecipeRegister;
