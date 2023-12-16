import React,{ useEffect, useMemo, useState } from "react";
import { useGetAllRecipes,useDeleteRecipeMutation } from "hooks/services/Recipe";
import TableData from "../components/dataTable"
import { QueryResult } from "@apollo/client";
import { OperationVariables } from "apollo-boost";
import { useRouter } from "next/router";
import { Box, Stack } from "@mui/material";
import { ErrorAlert, SuccessAlert } from "components/sweetAlert";
import { useContextData } from "hooks/utils/contextIngredients";
import layout from '../styles/layout.module.css'





const Recipes: React.FC = () =>{


  let rowsData : QueryResult<any,OperationVariables> = useGetAllRecipes();
  const [rows, setRows] = useState<RowData[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [dataVersion, setDataVersion] = useState(0);
  const [deleteRecipe] = useDeleteRecipeMutation();
  const {setIngredientsIDsArray} =
  useContextData();
  const router = useRouter();
  const createObj = '/recipeRegister'
  
  const handleUpdate = (id:string) => {
    setIngredientsIDsArray([])
    router.push(`/recipeUpdate?idUpdate=${encodeURIComponent(id)}`)
  }
  const handleDelete = async (id: string) => {

    deleteRecipe({ variables: { deleteRecipeId: id } })
      .then((response: any) => {
        SuccessAlert('Receta(s) eliminada(s)')
        rowsData.refetch();
      })
      .catch((error: any) => {
        ErrorAlert('Error al eliminar')
      });
  };

  useEffect(() => {
    if (rowsData && rowsData.data) {
      setRows(rowsData.data.GetAllRecipes.slice());
      setDataLoaded(true);
    }
  }, [rowsData]);

  useEffect(() => {
    if (dataLoaded) {
      setDataVersion((prevDataVersion) => prevDataVersion + 1);
    }
  }, [dataLoaded]);



  const columns = useMemo(()=>{
    if(rows.length > 0){
      return [
        { field: "name", 
        headerName: "Nombre",
        width: 250, 
        editable: false 
        },
        { field: "version", 
        headerName: "Version",
        width: 150, 
        editable: false },
        { field: "portions", 
        headerName: "Porciones",
        width: 150, 
        editable: false 
        },
        { field: "totalCostPerQuantity", 
        headerName: "Costo Total",
        width: 150, 
        editable: false },
        { field: "totalCostRawMaterial", 
        headerName: "Costo Total por Materia Prima",
        width: 250, 
        editable: false },
      ]
    }
    return []
  },[rows])




    return(
    <Box textAlign={'center'} display={'flex'} justifyContent={'space-around'} className={layout.layout} >
    <Box width={700}>
    <Stack alignItems={"center"} fontFamily={"Times New Roman"} fontSize={28}>
        <h1>Recetas</h1>
      </Stack>
      {dataLoaded ? (
        <TableData
          dataRows={rows}
          columns={columns}
          urlCreate={createObj}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          dataVersion={dataVersion}
        />
      ) : (
        <div>Loading...</div>
      )}
    </Box>
    </Box>
    )
}


export default Recipes;