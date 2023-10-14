import React, { useState, useEffect, useMemo } from "react";
import { Box, Stack } from "@mui/material";
import AddDataGridInfo from "components/addDatatable";
import ReciveDataGridInfo from "components/ReciveDataTable";
import { OperationVariables, QueryResult } from "@apollo/react-hooks";
import {useGetAllIngredients} from "../hooks/services/Ingredients";
import { AppButton } from "components/Button";
import { useRouter } from "next/router";
import { useContextData } from "hooks/utils/contextIngredients";



const AddIngredientsToRecipe: React.FC = () => {
  const {ingredientsIDsArray, setIngredientsIDsArray } = useContextData();
  const [rows, setRows] = useState<RowData[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);
  let rowsData: QueryResult<any, OperationVariables> = useGetAllIngredients();
  const router = useRouter();
  const [ingredientQuantity,setIngredientQuantity]=useState(0)
  const [totalCostIngredient,setTotalCostIngredient]= useState(0)

  useEffect(() => {
    if (rowsData && rowsData.data) {
      setRows(rowsData.data.GetAllIngredients.slice());
      setDataLoaded(true);
    }
  }, [rowsData]);

  useEffect(() => {
    if (dataLoaded) {
      setDataVersion((prevDataVersion) => prevDataVersion + 1);
    }
  }, [dataLoaded]); //TODO:Revisar

  const handleAddNewRow = () => {
    router.push("/Ingredients-Register");
  };

  //*Data second table */

  //TODO: Pendiente recuperar filas de la tabla2 cuando el context no esta vacio.

 

useEffect(() => {

  const contextRows : RowData[] = [];
  for(const id of ingredientsIDsArray){
    for (const ingredient of rows) {
      if(ingredient.id === id){
        contextRows.push(ingredient)
      }
    }
  }
  setRows2(contextRows)
}
,[rows])





  const [rows2, setRows2] = useState<RowData[]>([]);
  const [newRowsID, setNewRowsID] = useState<string[]>([]);

  const handleGetIngredientsID = (ingredients: RowData[]) => {
    const newRows2 = [...rows2];
    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];
      const existsInDataRow2 = newRows2.some((row) => row.id === ingredient.id);
      if (!existsInDataRow2) {
        newRows2.push(ingredient);
      }
    }
    setRows2(newRows2);
    clearContext()
  };
  const handleDeleteIngredientsRows = (id: string) => {
    const newRows2 = [...rows2];
    const index = newRows2.findIndex((row) => row.id === id);
    newRows2.splice(index, 1);
    setRows2(newRows2);
  };


  const clearContext= () => {
    setNewRowsID([...ingredientsIDsArray])
    const clearContext : string[]= []
    setIngredientsIDsArray(clearContext);
  }

  const handleReturnIngredientsIDs = ()=>{    
      const tempRows = newRowsID

      for (let i = 0; i < rows2.length; i++) {
        const ingredient = rows2[i];
        const existsInDataRowID = tempRows.some((row) => row === ingredient.id);
        if (!existsInDataRowID) {
          tempRows.push(ingredient.id);
        }
      }
      setIngredientsIDsArray(tempRows)
      setNewRowsID([])
      router.push("/recipeRegister");
      
  }

  const columns = useMemo(() => {
    if (rows.length > 0) {
      return [
        // { field: "id", headerName: "ID", width: 0, editable: true },
        { field: "name", headerName: "Nombre", width: 150, editable: false },
        {
          field: "supplier",
          headerName: "Proveedor",
          width: 200,
          editable: false,
        },
        {
          field: "presentation",
          headerName: "Presentación",
          width: 100,
          editable: false,
        },
        { field: "mermado", headerName: "Mermado", width: 100, editable: false },
      ];
    }
    return [];
  }, [rows]);

  const columns2 = useMemo(() => {
    if (rows2.length > 0) {
      return [
        { field: "id", headerName: "ID", width: 0, editable: true },
        { field: "name", headerName: "Nombre", width: 150, editable: false },
        // {
        //   field: "supplier",
        //   headerName: "Proveedor",
        //   width: 200,
        //   editable: false,
        // },
        {
          field: "costPerGram",
          headerName: "Costo/g",
          width: 100,
          editable: false,
        },
        { field: "ingredientQuantity", headerName: "Cantidad", width: 100, editable: true },
        { field: "totalCostIngredient", headerName: "Costo", width: 100, editable: false },
        // { field: "mermado", headerName: "Mermado", width: 100, editable: true },
      ];
    }
    return [];
  }, [rows2]);

  return (
    <Box>
      <Stack alignItems={"center"} fontFamily={"Times New Roman"} fontSize={28}>
        <h1>Agregar Ingredientes</h1>
      </Stack>
      <Box
        display="flex"
        flexDirection="row"
        width="100%"
        alignContent="center"
      >
        <Stack width="47.5%">
          {dataLoaded ? (
            <AddDataGridInfo
              dataRows={rows}
              columns={columns}
              dataVersion={dataVersion}
              handleGetData={handleGetIngredientsID}
              handleAdd={handleAddNewRow}
            />
          ) : (
            <div>Loading...</div>
          )}
        </Stack>
        <Stack width="5%"></Stack>
        <Stack width="47.5%">
          {dataLoaded ? (
            <ReciveDataGridInfo
              dataRows={rows2}
              columns={columns2}
              dataVersion={dataVersion}
              handleDeleteIngredients={handleDeleteIngredientsRows}
            />
          ) : (
            <div>Loading...</div>
          )}
        </Stack>
      </Box>
      <Stack margin={3} alignItems={'center'}>
        <Stack>
        <AppButton onClick={handleReturnIngredientsIDs}>Guardar</AppButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddIngredientsToRecipe;
