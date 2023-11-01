import React, { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import {
  useGetAllSupplierQuery,
  useDeleteSupplierMutation,
} from "../hooks/services/Supplier";
import TableData from "../components/dataTable";
import { useRouter } from "next/router";
import { OperationVariables, QueryResult } from "@apollo/react-hooks";
import ingredientsStyle from "../styles/Ingredients-register.module.css";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";

const Suppliers: React.FunctionComponent = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const createObj: string = "/supplierRegister";
  const deleteSupplierMutationHook = useDeleteSupplierMutation();
  const [deleteSupplier] = deleteSupplierMutationHook;
  let rowsData: QueryResult<any, OperationVariables> = useGetAllSupplierQuery();
  const [dataVersion, setDataVersion] = useState(0);
  const router = useRouter();
  const handleDeleteSelected = async (id: string) => {

    deleteSupplier({ variables: { deleteSupplierId: id } })
      .then((response: any) => {
        SuccessAlert('Proveedor(s) Eliminado(s)')
        rowsData.refetch();
      })
      .catch((error: any) => {
        ErrorAlert('Error al eliminar')
      });
  };

  const handleUpdateSelected = (id: string) => {
    router.push(`/supplierUpdate?idUpdate=${encodeURIComponent(id)}`);
  };
  const { Update } = router.query;

  useEffect(() => {
    if (typeof Update === "string" && Update === 'true') {
      rowsData.refetch();
    }
  }, [Update]);

  useEffect(() => {
    if (rowsData && rowsData.data) {
      setRows(rowsData.data.GetAllSuppliers.slice());
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
          field: "location",
          headerName: "Ubicacion",
          width: 250,
          editable: true,
        },
        {
          field: "phone",
          headerName: "Telefono",
          width: 150,
          editable: true,
        }
      ];
    }
    return [];
  }, [rows]);
  return (
    <Box className={ingredientsStyle.box}>
      <h1 className={ingredientsStyle.tableTitle}>Proveedores</h1>
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


export default Suppliers;
