import React, {useState} from "react";
import "./Ingredients-Register.css"
import { Footer } from "../components/Footer";
import { NavBar } from '../components/NavBar';
import {Stack, TextField,FormControl,MenuItem,InputLabel,FormHelperText} from "@mui/material";
import { AppButton } from "../components/Button";
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const IngredientsRegister: React.FunctionComponent = () => {
    
    
    const [Name, setName] = useState<string>();
    const [Format, setFormat] = useState<string>();
    const [Price, setPrice] = useState<string>();
    const [Supplier, setSupplier] = useState<string>();
    const handleChange = (event: SelectChangeEvent) => {
        setSupplier(event.target.value);
      };
    const [Yield, setYield] =useState<string>();

    
    return (
      <>
        <NavBar />
        <h1>Registrar ingrediente</h1>
        <Stack className="RowContainer" direction={"row"} spacing={5}>
          <Stack className="IngredientInputs" direction={"column"} spacing={5}>
            <TextField
              id="IngName"
              label="Nombre del artículo"
              variant="outlined"
              className="TextField-root"
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                setName(event.target.value)
              }}
            />
            <TextField
              id="IngFormat"
              label="Presentación"
              variant="outlined"
              className="TextField-root"
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                setFormat(event.target.value)
              }}
            />
            <TextField
              id="IngPrice"
              label="Precio"
              variant="outlined"
              className="TextField-root"
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                setPrice(event.target.value)
              }}
            />
            <FormControl className="FormControl-root">
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
          <Stack className="IngredientOutputs" direction={"column"} spacing={5}>
          <TextField
                id="GramPrice"
                label="Precio por gramo"
                variant="outlined"
                className="TextField-root"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
              id="IngYield"
              label="Redimiento"
              variant="outlined"
              className="TextField-root"
              //revisar si es editable
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{
                setYield(event.target.value)
              }}
            />
            <TextField
                id="YieldPercent"
                label="Porcentaje de Rendimiento"
                variant="outlined"
                className="TextField-root"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="DepletedPrice"
                label="Precio mermado"
                variant="outlined"
                className="TextField-root"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                id="PriceX2"
                label="Precio x 2"
                variant="outlined"
                className="TextField-root"
                InputProps={{
                    readOnly: true,
                }}
            />            
          </Stack>
        </Stack>
        <Stack className="btn">
            <AppButton className="btn-Save">
                Guardar
            </AppButton>
        </Stack>

        <Footer />
      </>
    );
  };