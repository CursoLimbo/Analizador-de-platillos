import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

interface RowData {
  id: number;
  [key: string]: string | number | null;
}

interface DataGridProps {
  rows: RowData[];
  columns: GridColDef[];
}

const DataGridInfo: React.FC<DataGridProps> = ({ rows, columns }) => {
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [selectedRow, setSelectedRow] = React.useState<RowData | null>(null);

  const handleSelectionChange = (selection: any[]) => {
    const selectedRowIds = selection.map((item) => item.id);
    setSelectedIds(selectedRowIds);

    if (selection.length === 1) {
      const selectedRowIndex = rows.findIndex((row) => row.id === selection[0].id);
      setSelectedRow(rows[selectedRowIndex]);
    } else {
      setSelectedRow(null);
    }
  };

  const handleDeleteSelected = () => {
    // Implement your logic to delete the selected rows based on the selectedIds array.
    console.log('Deleting selected rows:', selectedIds);
    setSelectedIds([]);
  };

  const handleEditSelected = () => {
    // Implement your logic to edit the selected row.
    console.log('Editing selected row:', selectedRow);
  };

  const handleAddRow = () => {
    // Implement your logic to add a new row.
    console.log('Adding a new row');
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="div">
          My Data Table
        </Typography>
        <Box>
          {selectedIds.length > 0 && (
            <IconButton onClick={handleDeleteSelected}>
              <DeleteIcon />
            </IconButton>
          )}
          {selectedIds.length === 1 && (
            <IconButton onClick={handleEditSelected}>
              <EditIcon />
            </IconButton>
          )}
          {selectedIds.length === 0 &&(
            <IconButton onClick={handleAddRow}>
                <AddIcon />
            </IconButton>
          )}

        </Box>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleSelectionChange}
      />
    </Box>
  );
};

// Ejemplo de uso con datos y columnas dinámicos
const data: RowData[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 30 },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 25 },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 40 },
];

const columns: GridColDef[] = Object.keys(data[0]).map((key) => ({
  field: key,
  headerName: key.charAt(0).toUpperCase() + key.slice(1),
  width: 150,
  editable: true,
}));

export default function App() {
  return <DataGridInfo rows={data} columns={columns} />;
}
