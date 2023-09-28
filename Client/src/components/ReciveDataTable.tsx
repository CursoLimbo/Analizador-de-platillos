import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box/Box";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import DataFilter from "./dataFilter";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListIcon from '@mui/icons-material/List';

interface DataGridProps {
  dataRows: RowData[];
  columns: GridColDef[];
  dataVersion: number;
  handleDeleteIngredients: (id: string) => void;
}

const AddDataGridInfo: React.FC<DataGridProps> = ({
  dataRows,
  columns,
  dataVersion,
  handleDeleteIngredients,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filteredRows, setFilteredRows] = useState<RowData[]>(dataRows);

  const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
    const selectedRowIds = rowSelectionModel.map((id) => String(id));
    setSelectedIds(selectedRowIds);
  };

  const handledeleteIngredients = () => {
    for (let i = 0; i < selectedIds.length; i++) {
      handleDeleteIngredients(selectedIds[i]);
    }
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
      <DataFilter rows={dataRows} onDataFiltered={handleDataFiltered} />
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box>
          {selectedIds.length === 0 && (
              <IconButton onClick={handledeleteIngredients}>
                <ListIcon />
              </IconButton>
            )}
            {selectedIds.length > 0 && (
              <IconButton onClick={handledeleteIngredients}>
                <DeleteIcon />
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

export default AddDataGridInfo;
