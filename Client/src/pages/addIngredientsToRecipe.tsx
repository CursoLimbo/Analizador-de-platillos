import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  IconButton,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { OperationVariables, QueryResult } from "@apollo/react-hooks";
import { useGetAllIngredients } from "../hooks/services/Ingredients";
import { AppButton } from 'components/Button';
import { useContextData } from 'hooks/utils/contextIngredients';
import { useRouter } from 'next/router';


const AddIngredientsToRecipe: React.FC = () => {
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  let rowsData: QueryResult<any, OperationVariables> = useGetAllIngredients();
  const [rows, setRows] = useState<RowData[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { ingredientsIDsArray, setIngredientsIDsArray } = useContextData();
  const Router = useRouter();

  useEffect(() => {
    if (ingredientsIDsArray.length > 0) {
      setIngredients(ingredientsIDsArray);
    }
  }, [ingredientsIDsArray]);

  useEffect(() => {
    if (rowsData && rowsData.data) {
      setRows(rowsData.data.GetAllIngredients.slice());
      setDataLoaded(true);
    }
  }, [rowsData]);

  const handleAddIngredient = () => {
    if (selectedIngredient && ingredientQuantity !== '') {
      const selectedIngredientRow = rows.find((ingredient) => ingredient.id === selectedIngredient);

      if (selectedIngredientRow) {
        const isAlreadyAdded = ingredients.some((ingredient) => ingredient.id === selectedIngredient);

        if (!isAlreadyAdded) {
          const newIngredient: RecipeIngredient = {
            id: selectedIngredient,
            name: selectedIngredientRow.name,
            quantity: parseFloat(ingredientQuantity),
          };
          setIngredients([...ingredients, newIngredient]);
          setSelectedIngredient('');
          setIngredientQuantity('');
        } else {
          alert('Este ingrediente ya ha sido agregado.');
        }
      }
    }
  };

  const handleRemoveIngredient = (id: string) => {
    const updatedIngredients = ingredients.filter((ingredient) => ingredient.id !== id);
    setIngredients(updatedIngredients);
  };

  const handleSaveIngredients = () => {
    console.log('handleSaveIngredients')
    const ingredientsToSave: RecipeIngredient[] = [];

    ingredients.forEach((ingredient) => {
      const { id, name, quantity } = ingredient;
      ingredientsToSave.push({ id, name, quantity });
    });
    console.log(ingredientsToSave)
    setIngredientsIDsArray(ingredientsToSave);
    Router.push("/recipeRegister");
  };

  return (
    <Container maxWidth="md">
      <Stack
        alignItems={"center"}
        fontFamily={"Times New Roman"}
        fontSize={28}
      >
        <h1>Agregar Ingredientes</h1>
      </Stack>
      <FormControl fullWidth>
        <InputLabel>Selecciona un Ingrediente</InputLabel>
        <Select
          value={selectedIngredient}
          onChange={(e) => setSelectedIngredient(e.target.value as string)}
        >
          {rows.map((ingredient) => (
            <MenuItem key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="number"
        label="Cantidad(g)"
        value={ingredientQuantity}
        onChange={(e) => setIngredientQuantity(e.target.value)}
        fullWidth
      />
      <Stack mt={3} mb={3} alignItems={'center'}>
        <AppButton onClick={handleAddIngredient}>
          Agregar
        </AppButton>
      </Stack>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cantidad(g)</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((ingredient, index) => (
              <TableRow key={index}>
                <TableCell>{ingredient.id}</TableCell>
                <TableCell>{ingredient.name}</TableCell>
                <TableCell>{ingredient.quantity}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleRemoveIngredient(ingredient.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack mt={3} mb={3} alignItems={'center'}>
        <AppButton onClick={handleSaveIngredients}>
          Guardar
        </AppButton>
      </Stack>
    </Container>
  );
};

export default AddIngredientsToRecipe;
