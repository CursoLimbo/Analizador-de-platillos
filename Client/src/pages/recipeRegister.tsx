import { IconButton, Stack, TextField } from "@mui/material";
import { AppButton } from "components/Button";
import RichTextEditor from "components/richTextEditor";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import { useCreateRecipeMutation } from "hooks/services/Recipe";
type RecipeFormatdata = {
  name: string;
  quantity: number;
  ingredients: string[];
};

const RecipeRegister: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [mutate] = useCreateRecipeMutation();
  const router = useRouter();

  const [procedure, setProcedure] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleAddIngredient = () => {
    
  }

  const handleSetText = (text: string) => {
    setProcedure(text);
  };

  const handleSelectIngredients = () => {
    router.push("/addIngredientsToRecipe");
  };

  const onSubmit = async (data: FieldValues) => {
    const newRecipes = {
      name: data.name,
      quantity: data.cant,
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
          console.log(error.message);
          ErrorAlert("Receta no registrada");
        });
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
          <h1>Registar receta</h1>
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
            label="Cantidad(g)"
            variant="outlined"
            type="number"
            {...register("cant", { required: true })}
            error={!!errors.cant}
            helperText={errors.cant && "Este campo es requerido"}
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
