import React, {useState} from "react";
import ingredientsRegisterStyles from "@/styles/ingredients-register.module.css";
import { Footer } from "@/components/Footer";
import { NavBar } from '@/components/NavBar';
import {Stack, TextField,FormControl,MenuItem,InputLabel,FormHelperText} from "@mui/material";
import { AppButton } from "@/components/Button";
import Select, { SelectChangeEvent } from '@mui/material/Select';

//TODO: research about userForm
const IngredientsRegister: React.FunctionComponent = () => {
    const [Name, setName] = useState<string>();
    const [Format, setFormat] = useState<string>();
    const [Price, setPrice] = useState<string>();
    const [Supplier, setSupplier] = useState<string>();
    const [Yield, setYield] =useState<string>();

    const handleChange = (event: SelectChangeEvent) => {
        setSupplier(event.target.value);
      };
    
    return (
      <>
        <NavBar isHome={false}/>
        <h1 className={ingredientsRegisterStyles.title}>Registrar ingrediente</h1>
        <Stack className={ingredientsRegisterStyles.RowContainer} direction={"row"} spacing={5}>
          <Stack className={ingredientsRegisterStyles.IngredientInputs} direction={"column"} spacing={5}>
            <TextField
              id="IngName"
              label="Nombre del artículo"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                setName(event.target.value)
              }}
            />
            <TextField
              id="IngFormat"
              label="Presentación"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                setFormat(event.target.value)
              }}
            />
            <TextField
              id="IngPrice"
              label="Precio"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                setPrice(event.target.value)
              }}
            />
            <FormControl className={ingredientsRegisterStyles.FormControlRoot}>
                <InputLabel id="Supplier-label">Proveedor</InputLabel>
                <Select
                    labelId="Supplier-label"
                    id="IngSupplier"
                    value={Supplier}
                    label="Proveedor"
                    onChange={handleChange}
                >
                </Select>
                </FormControl>
          </Stack>

          <Stack style={{ width: "20px" }} />
          <Stack className={ingredientsRegisterStyles.IngredientOutputs} direction={"column"} spacing={5}>
          <TextField
                id="GramPrice"
                label="Precio por gramo"
                variant="outlined"
                className={ingredientsRegisterStyles.TextFieldRoot}
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
              id="IngYield"
              label="Redimiento"
              variant="outlined"
              className={ingredientsRegisterStyles.TextFieldRoot}
              // check if it's editable
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                setYield(event.target.value)
              }}
            />
            <TextField
                id="YieldPercent"
                label="Porcentaje de Rendimiento"
                variant="outlined"
                className={ingredientsRegisterStyles.TextFieldRoot}
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="DepletedPrice"
                label="Precio mermado"
                variant="outlined"
                className={ingredientsRegisterStyles.TextFieldRoot}
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="PriceX2"
                label="Precio x 2"
                variant="outlined"
                className={ingredientsRegisterStyles.TextFieldRoot}
                InputProps={{
                    readOnly: true,
                }}
            />            
          </Stack>
        </Stack>
        <Stack className={ingredientsRegisterStyles.btn}>
            <AppButton className={ingredientsRegisterStyles.btnSave}>
                Guardar
            </AppButton>
        </Stack>

        <Footer />
      </>
    );
  };

export default IngredientsRegister;