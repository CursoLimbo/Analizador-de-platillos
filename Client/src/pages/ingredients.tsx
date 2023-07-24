import React, { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { useGetAllIngredients, useDeleteIngredientMutation } from '../hooks/services/Ingredients';
import TableData from '../components/dataTable';
import { OperationVariables, QueryResult } from '@apollo/react-hooks';



const Ingredients: React.FunctionComponent = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const createObj: string = 'Ingredients-Register';
  const deleteIngredientMutationHook = useDeleteIngredientMutation();
  const [deleteIngredient] = deleteIngredientMutationHook;
  let rowsData:QueryResult<any, OperationVariables>|undefined = useGetAllIngredients();
  const [version, setVersion] = useState(0);
  const tableName: string = 'Ingredientes';

  const handleDeleteSelected = (id: string) => {
    deleteIngredient({ variables: { deleteIngredientId: id } })
      .then((response: any) => {
        console.log('Ingredient deleted:', response);
      })
      .catch((error: any) => {
        console.error('Error deleting ingredient:', error);
      });

    setVersion(version + 1); 
  };



  
//todo:mejora para renderizar componente
  // useEffect(()=>{
  //   rowsData
  // }),[version]


  useEffect(() => {
    if (rowsData && rowsData.data) {
      setRows(rowsData.data.GetAllIngredients.slice());
      setDataLoaded(true);
    }
  }, [rowsData]);

  const columns = useMemo(() => {
    if (rows.length > 0) {
      return [
        { field: 'id', headerName: 'ID', width: 250, editable: true },
        { field: 'name', headerName: 'Nombre', width: 300, editable: true },
        { field: 'supplier', headerName: 'Proveedor', width: 300, editable: true },
        { field: 'presentation', headerName: 'Presentaciónn', width: 100, editable: true },
        { field: 'performance', headerName: 'Rendimiento', width: 100, editable: true },
        { field: 'mermado', headerName: 'Mermado', width: 100, editable: true },
        { field: 'performancePercentage', headerName: '% Redimiento', width: 100, editable: true },
        { field: 'productMultiplyByTwo', headerName: 'ProductoX2', width: 100, editable: true },
      ];
    }
    return [];
  }, [rows]);

  return (
    <Box>
      {dataLoaded ? (
        <TableData dataRows={rows} columns={columns} tableName={tableName} urlCreate={createObj} handleDelete={handleDeleteSelected} />
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
};

export default Ingredients;
