import React, { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import {
  useGetAllDiscounts,
  useDeleteDiscountMutation,
} from "../hooks/services/Discounts";
import TableData from "../components/dataTable";
import { useRouter } from "next/router";
import { OperationVariables, QueryResult } from "@apollo/react-hooks";
import ingredientsStyle from "../styles/Ingredients-register.module.css";
import { ConfirmAlert, ErrorAlert, SuccessAlert } from "components/sweetAlert";
import layout from '../styles/layout.module.css'
import Title from "components/Title";

const Discounts: React.FunctionComponent = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const createObj: string = "/discountRegister";
  const deleteDiscountMutationHook = useDeleteDiscountMutation();
  const [deleteDiscount] = deleteDiscountMutationHook;
  let rowsData: QueryResult<any, OperationVariables> = useGetAllDiscounts();
  const [dataVersion, setDataVersion] = useState(0);
  const router = useRouter();
  const handleDeleteSelected = async (id: string) => {

    deleteDiscount({ variables: { deleteDiscountId: id } })
      .then((response: any) => {
        SuccessAlert('Descuento(s) Eliminado(s)')
        rowsData.refetch();
      })
      .catch((error: any) => {
        ErrorAlert('Error al eliminar')
      });
  };

  const handleUpdateSelected = (id: string) => {
    router.push(`/discountUpdate?idUpdate=${encodeURIComponent(id)}`);
  };
  const { Update } = router.query;

  useEffect(() => {
    if (typeof Update === "string" && Update === 'true') {
      rowsData.refetch();
    }
  }, [Update]);

  useEffect(() => {
    if (rowsData && rowsData.data) {
      setRows(rowsData.data.GetAllDiscounts.slice());
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
          field: "percentage",
          headerName: "Cantidad (Porcentaje)",
          width: 250,
          editable: true,
        },
        {
          field: "description",
          headerName: "Descripcion",
          width: 150,
          editable: true,
        }
      ];
    }
    return [];
  }, [rows]);
  return (
    <Box className={`${ingredientsStyle.box} ${layout.layout}`}>
      <Title text="Descuentos"/>
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


export default Discounts;
