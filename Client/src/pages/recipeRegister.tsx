import { IconButton, Stack, TextField } from "@mui/material";
import { AppButton } from "components/Button";
import RichTextEditor from "components/richTextEditor";
import { ConfirmAlert } from "components/sweetAlert";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";

type RecipeFormatdata = {
  nameRecipe: string;
  cant: number;
};

const RecipeRegister: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const router = useRouter();

  const [procedure, setProcedure] = useState("");
  // const name = watch("name", "");
  // const cant = watch("cant", 0);

  const handleSetText = (text: string) => {
    setProcedure(text);
  };

  const handleSelectIngredients =()=>{
    router.push("/addIngredientsToRecipe")
  }

  const onSubmit = async (data: Record<string, any>) => {
    const newRecipe = {
      nameRecipe: data.name,
      cant: data.cant,
      procedure: procedure,
    };

    const confirm = await ConfirmAlert();
    if (confirm) {
      console.log(newRecipe);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={"column"} spacing={5} alignItems={"center"}>
        <Stack alignItems={"center"}
        fontFamily={'Times New Roman'}
        fontSize={28}>
          <h1>Registar receta</h1>
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
        <AppButton  onClick={handleSelectIngredients}  >+ Ingredientes</AppButton>
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
