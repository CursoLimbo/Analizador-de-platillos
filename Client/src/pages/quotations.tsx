import React, { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import {
  useGetAllQuotations,
  useDeleteQuotationMutation,
} from "../hooks/services/Quotation";
import TableData from "../components/dataTable";
import { useRouter } from "next/router";
import { OperationVariables, QueryResult } from "@apollo/react-hooks";
import ingredientsStyle from "../styles/Ingredients-register.module.css";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";

const Quotations: React.FunctionComponent = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const createObj: string = "/quotationRegister";
  const deleteQuotationMutationHook = useDeleteQuotationMutation();
  const [deleteQuotation] = deleteQuotationMutationHook;
  let rowsData: QueryResult<any, OperationVariables> = useGetAllQuotations();
  const [dataVersion, setDataVersion] = useState(0);
  const router = useRouter();
  const handleDeleteSelected = async (id: string) => {

    deleteQuotation({ variables: { deleteQuotationId: id } })
      .then((response: any) => {
        SuccessAlert('Cotizacion(s) Eliminado(s)')
        rowsData.refetch();
      })
      .catch((error: any) => {
        ErrorAlert('Error al eliminar')
      });
  };

  const handleUpdateSelected = (id: string) => {
    router.push(`/quotationUpdate?idUpdate=${encodeURIComponent(id)}`);
  };
  const { Update } = router.query;

  useEffect(() => {
    if (typeof Update === "string" && Update === 'true') {
      rowsData.refetch();
    }
  }, [Update]);

  useEffect(() => {
    if (rowsData && rowsData.data) {
      setRows(rowsData.data.GetAllQuotations.slice());
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
        { field: "name", 
        headerName: "Tipo de Cotizacion", 
        width: 250, 
        editable: true },
        { field: "client", 
        headerName: "Cliente",
        width: 150, 
        editable: true },
        {
          field: "date",
          headerName: "Fecha",
          width: 250,
          editable: true,
        },
        {
          field: "code",
          headerName: "Codigo",
          width: 150,
          editable: true,
        }
      ];
    }
    return [];
  }, [rows]);
  return (
    <Box className={ingredientsStyle.box}>
      <h1 className={ingredientsStyle.tableTitle}>Cotizaciones</h1>
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


export default Quotations;
