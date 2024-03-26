import React, { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import {
  useGetAllClients,
  useDeleteClientMutation,
} from "../hooks/services/Clients";
import TableData from "../components/dataTable";
import { useRouter } from "next/router";
import { OperationVariables, QueryResult } from "@apollo/react-hooks";
import ingredientsStyle from "../styles/Ingredients-register.module.css";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";
import Title from "components/Title";
import layout from '../styles/layout.module.css'

const Clients: React.FunctionComponent = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const createObj: string = "/clientRegister";
  const deleteClienMutationtHook = useDeleteClientMutation();
  const [deleteClient] = deleteClienMutationtHook;
  let rowsData: QueryResult<any, OperationVariables> = useGetAllClients();
  const [dataVersion, setDataVersion] = useState(0);
  const router = useRouter();
  const handleDeleteSelected = async (id: string) => {

    deleteClient({ variables: { deleteClientId: id } })
      .then((response: any) => {
        SuccessAlert('Cliente(s) Eliminado(s)')
        rowsData.refetch();
      })
      .catch((error: any) => {
        ErrorAlert('Error al eliminar')
      });
  };

  const handleUpdateSelected = (id: string) => {
    router.push(`/clientUpdate?idUpdate=${encodeURIComponent(id)}`);
  };
  const { Update } = router.query;

  useEffect(() => {
    if (typeof Update === "string" && Update === 'true') {
      rowsData.refetch();
    }
  }, [Update]);

  useEffect(() => {
    if (rowsData && rowsData.data) {
      setRows(rowsData.data.GetAllClients.slice());
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
          field: "email",
          headerName: "Correo Electronico",
          width: 250,
          editable: true,
        },
        {
          field: "location",
          headerName: "Ubicacion",
          width: 150,
          editable: true,
        },
        {
          field: "phone",
          headerName: "Telefono",
          width: 150,
          editable: true,
        },
        {
          field: "whatsapp",
          headerName: "WhatsApp",
          width: 150,
          editable: true,
        },
      ];
    }
    return [];
  }, [rows]);
  return (
    <Box className={`${ingredientsStyle.box} ${layout.layout}`}>
      <Title text="Clientes"/>
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


export default Clients;
