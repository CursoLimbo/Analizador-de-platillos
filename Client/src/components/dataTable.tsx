import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DataFilter from '../components/dataFilter';



interface DataGridProps {
  dataRows: RowData[];
  columns: GridColDef[];
  urlCreate: string;
  handleDelete: (id: string) => void;
  handleUpdate: (id:string) => void
  dataVersion: number;
}

const DataGridInfo: React.FC<DataGridProps> = ({ dataRows, columns, urlCreate, handleDelete,handleUpdate, dataVersion }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filteredRows, setFilteredRows] = useState<RowData[]>(dataRows);

  const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
    const selectedRowIds = rowSelectionModel.map((id) => String(id));
    setSelectedIds(selectedRowIds);

  };

  const handleDeleteSelected = () => {
    console.log('Deleting selected rows:', selectedIds);
    for (const id of selectedIds) {
      handleDelete(id);
    }
  };

  const handleEditSelected = () => {
    console.log('Deleting selected rows:', selectedIds[0]);
    handleUpdate(selectedIds[0]);

  };

  const handleAddRow = (url: string) => {
    console.log('Adding a new row');
    window.location.href = url;
  };

  const handleDataFiltered = (filteredData: RowData[]) => {
    setSelectedIds([]);
    setFilteredRows(filteredData);
  };


  useEffect(() => {
    setFilteredRows(dataRows);
  }, [dataVersion, dataRows]);

  return (
    <Box>
      <DataFilter rows={dataRows} onDataFiltered={handleDataFiltered}  />
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
