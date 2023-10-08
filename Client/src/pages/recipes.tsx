import React,{ useEffect, useMemo, useState } from "react";
import { useGetAllRecipes } from "hooks/services/Recipe";
import TableData from "../components/dataTable"
import { QueryResult } from "@apollo/client";
import { OperationVariables } from "apollo-boost";
import { useRouter } from "next/router";
import { Box, Stack } from "@mui/material";



const Recipes: React.FC = () =>{


  let rowsData : QueryResult<any,OperationVariables> = useGetAllRecipes();
  const [rows, setRows] = useState<RowData[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const [dataVersion, setDataVersion] = useState(0);
  const router = useRouter();
  const createObj = '/recipeRegister'
  
  const handleUpdate = () => {}
  const handleDelete = () => {}

  useEffect(() => {
    console.log(rowsData)
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
        { field: "portions", 
        headerName: "Porciones",
        width: 150, 
        editable: false 
        },
        { field: "totalCostPerQuantity", 
        headerName: "Costo Total",
        width: 150, 
        editable: false },
      ]
    }
    return []
  },[rows])




    return(
    <Box textAlign={'center'} display={'flex'} justifyContent={'space-around'}>
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