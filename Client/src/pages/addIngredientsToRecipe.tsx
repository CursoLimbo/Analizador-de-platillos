import React, { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import AddDataGridInfo from "components/addDatatable";
import { OperationVariables, QueryResult } from "@apollo/react-hooks";
import {
  useGetAllIngredients,
} from "../hooks/services/Ingredients";





const AddIngredientsToRecipe: React.FC = () => {

    const [rows, setRows] = useState<RowData[]>([])
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataVersion, setDataVersion] = useState(0);
    let rowsData: QueryResult<any, OperationVariables> = useGetAllIngredients();


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
      }, [dataLoaded]);

      const columns = useMemo(() => {
        if (rows.length > 0) {
          return [
            { field: "id", 
            headerName: "ID", 
            width: 0, 
            editable: true,
            },
            { field: "name", 
            headerName: "Nombre",
            width: 150, 
            editable: true },
            {
              field: "supplier",
              headerName: "Proveedor",
              width: 200,
              editable: true,
            },
            {
              field: "presentation",
              headerName: "Presentación",
              width: 150,
              editable: true,
            },
            { field: "mermado", 
            headerName: "Mermado",
             width: 100, 
             editable: true
             },
          ];
        }
        return [];
      }, [rows]);



      return (
        <Box >
          {dataLoaded ? (
            <AddDataGridInfo
              dataRows={rows}
              columns={columns}
              dataVersion={dataVersion}
            />
          ) : (
            <div>Loading...</div>
          )}
        </Box>
      );
}

export default AddIngredientsToRecipe;