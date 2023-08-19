import React, { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import {
  useGetAllIngredients,
  useDeleteIngredientMutation,
} from "../hooks/services/Ingredients";
import TableData from "../components/dataTable";
import { useRouter } from "next/router";
import { OperationVariables, QueryResult } from "@apollo/react-hooks";
import ingredientsStyle from "../styles/Ingredients-register.module.css";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";

const Ingredients: React.FunctionComponent = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const createObj: string = "Ingredients-Register";
  const deleteIngredientMutationHook = useDeleteIngredientMutation();
  const [deleteIngredient] = deleteIngredientMutationHook;
  let rowsData: QueryResult<any, OperationVariables> = useGetAllIngredients();
  const [dataVersion, setDataVersion] = useState(0);
  const router = useRouter();
  const handleDeleteSelected = async (id: string) => {

    deleteIngredient({ variables: { deleteIngredientId: id } })
      .then((response: any) => {
        SuccessAlert('Ingrediente(s) Eliminado(s)')
        rowsData.refetch();
      })
      .catch((error: any) => {
        ErrorAlert('Error al eliminar')
      });
  };

  const handleUpdateSelected = (id: string) => {
    router.push(`/ingredientUpdate?idUpdate=${encodeURIComponent(id)}`);
  };
  const { Update } = router.query;

  useEffect(() => {
    if (typeof Update === "string" && Update === 'true') {
      rowsData.refetch();
    }
  }, [Update]);

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
        width: 250, 
        editable: true },
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
        {
          field: "performance",
          headerName: "Rendimiento",
          width: 100,
          editable: true,
        },
        { field: "mermado", 
        headerName: "Mermado",
         width: 100, 
         editable: true },
        {
          field: "performancePercentage",
          headerName: "% Redimiento",
          width: 100,
          editable: true,
        },
        {
          field: "productMultiplyByTwo",
          headerName: "ProductoX2",
          width: 100,
          editable: true,
        },
      ];
    }
    return [];
  }, [rows]);

  return (
    <Box className={ingredientsStyle.box}>
      <h1 className={ingredientsStyle.tableTitle}>Ingredientes</h1>
      {dataLoaded ? (
        <TableData
          dataRows={rows}
          columns={columns}
          urlCreate={createObj}
          handleDelete={handleDeleteSelected}
          handleUpdate={handleUpdateSelected}
          dataVersion={dataVersion}
        />
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
};

export default Ingredients;
