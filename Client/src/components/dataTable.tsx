import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel,  } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DataFilter from '../components/dataFilter';


interface DataGridProps {
  tableName: string;
  dataRows: RowData[];
  columns: GridColDef[];
  urlCreate: string;
  handleDelete: Function;
}


const DataGridInfo: React.FC<DataGridProps> = ({ dataRows, columns, tableName, urlCreate, handleDelete }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [filteredRows, setFilteredRows] = useState<RowData[]>(dataRows);

  const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
    const selectedRowIds = rowSelectionModel.map((id) => String(id));
    setSelectedIds(selectedRowIds);
  
    if (selectedRowIds.length === 1) {
      const selectedRowIndex = filteredRows.findIndex((row) => row.id === selectedRowIds[0]);
      setSelectedRow(filteredRows[selectedRowIndex]);
    } else {
      setSelectedRow(null);
    }
  };
  

  const handleDeleteSelected = () => {
    console.log('Deleting selected rows:', selectedIds);
    for (const id of selectedIds) {
      handleDelete(id)
    }
  };
  

  const handleEditSelected = () => {
    console.log('Editing selected row:', selectedRow);
  };

  const handleAddRow = (url: string) => {
    console.log('Adding a new row');
    window.location.href = url;
  };

  const handleDataFiltered = (filteredData: RowData[]) => {
    setSelectedIds([]);
    setFilteredRows(filteredData);
  };

  return (
    <Box>
      <DataFilter rows={dataRows} onDataFiltered={handleDataFiltered} tableName={tableName} />
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
              <IconButton onClick={() => handleAddRow(urlCreate)}>
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





