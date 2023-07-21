import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DataFilter from '../components/dataFilter';

interface RowData {
  id: number;
  name: string;
  [key: string]: string | number | null;
}

interface DataGridProps {
  tableName: string;
  dataRows: RowData[];
  columns: GridColDef[];
}

const DataGridInfo: React.FC<DataGridProps> = ({ dataRows, columns, tableName }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [filteredRows, setFilteredRows] = useState<RowData[]>(dataRows);

  const handleSelectionChange = (selection: any[]) => {
    const selectedRowIds = selection.map((item) => item.id);
    setSelectedIds(selectedRowIds);

    if (selection.length === 1) {
      const selectedRowIndex = filteredRows.findIndex((row) => row.id === selection[0].id);
      setSelectedRow(filteredRows[selectedRowIndex]);
    } else {
      setSelectedRow(null);
    }
  };

  const handleDeleteSelected = () => {
    console.log('Deleting selected rows:', selectedIds);
    setSelectedIds([]);
  };

  const handleEditSelected = () => {
    console.log('Editing selected row:', selectedRow);
  };

  const handleAddRow = () => {
    console.log('Adding a new row');
  };

  const handleDataFiltered = (filteredData: RowData[]) => {
    setSelectedIds([]);
    setFilteredRows(filteredData);
  };

  return (
    <Box>

      <DataFilter rows={dataRows} onDataFiltered={handleDataFiltered} />
      <Box sx={{ height: '60vh', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="div">
            Registros
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
            {selectedIds.length === 0 && (
              <IconButton onClick={handleAddRow}>
                <AddIcon />
              </IconButton>
            )}
          </Box>
        </Box>

        <DataGrid
          rows={filteredRows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleSelectionChange}
        />
      </Box>
    </Box>
  );
};

export default DataGridInfo;
