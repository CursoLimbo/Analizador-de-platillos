import React, { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import {
  useGetAllCatalogues,
  useDeleteCatalogueMutation,
} from "../hooks/services/Catalogues";
import TableData from "../components/dataTable";
import { useRouter } from "next/router";
import { OperationVariables, QueryResult } from "@apollo/react-hooks";
import ingredientsStyle from "../styles/Ingredients-register.module.css";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";
import Title from "components/Title";
import layout from '../styles/layout.module.css'

const Catalogues: React.FunctionComponent = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const createObj: string = "/catalogueRegister";
  const deleteCatalogueMutationHook = useDeleteCatalogueMutation();
  const [deleteCatalogue] = deleteCatalogueMutationHook;
  let rowsData: QueryResult<any, OperationVariables> = useGetAllCatalogues();
  const [dataVersion, setDataVersion] = useState(0);
  const router = useRouter();
  const handleDeleteSelected = async (id: string) => {

    deleteCatalogue({ variables: { deleteCatalogueId: id } })
      .then((response: any) => {
        SuccessAlert('Catalogo(s) Eliminado(s)')
        rowsData.refetch();
      })
      .catch((error: any) => {
        ErrorAlert('Error al eliminar')
      });
  };

  const handleUpdateSelected = (id: string) => {
    router.push(`/catalogueUpdate?idUpdate=${encodeURIComponent(id)}`);
  };
  const { Update } = router.query;

  useEffect(() => {
    if (typeof Update === "string" && Update === 'true') {
      rowsData.refetch();
    }
  }, [Update]);

  useEffect(() => {
    if (rowsData && rowsData.data) {
      setRows(rowsData.data.GetAllCatalogues.slice());
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
        { field: "sid", 
        headerName: "ID", 
        width: 250, 
        editable: true },
        { field: "name", 
        headerName: "Nombre",
        width: 150, 
        editable: true },
        {
          field: "file",
          headerName: "Archivo",
          width: 150,
          editable: true,
        },
        {
          field: "date",
          headerName: "fecha",
          width: 200,
          editable: true,
        }
      ];
    }
    return [];
  }, [rows]);
  return (
    <Box className={`${ingredientsStyle.box} ${layout.layout}`} >
      <Title text="Catalogos"/> 
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


export default Catalogues;
