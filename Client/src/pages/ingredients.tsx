import { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { useGetAllIngredients } from '../hooks/services/Ingredients';
import TableData from "../components/dataTable";

interface RowData {
  id: number;
  [key: string]: string | number | null;
}
const tableName:string= 'Ingredientes'

const Ingredients: React.FunctionComponent = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const rowsData = useGetAllIngredients();

  useEffect(() => {
    if (rowsData.data) {
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
        <TableData rows={rows} columns={columns} tableName={tableName} />
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
};

export default Ingredients;
