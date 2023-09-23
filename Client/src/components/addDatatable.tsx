import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box/Box";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import DataFilter from "./dataFilter";
import IconButton from "@mui/material/IconButton";
import FastForwardIcon from "@mui/icons-material/FastForward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface DataGridProps {
  dataRows: RowData[];
  columns: GridColDef[];
  dataVersion: number;
  handleGetData: (ingredient: RowData[]) => void;
  handleAdd: () => void;
}

const AddDataGridInfo: React.FC<DataGridProps> = ({
  dataRows,
  columns,
  dataVersion,
  handleGetData,
  handleAdd,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<RowData[]>([]);
  const [filteredRows, setFilteredRows] = useState<RowData[]>(dataRows);

  const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
    const selectedRows = rowSelectionModel.map((id) => {
      const ingredient = dataRows.find((row) => row.id === id);
      if (ingredient) {
        return ingredient;
      }
      return null;
    });
    setSelectedIngredients(selectedRows.filter(Boolean) as RowData[]);
  };

  const handleAddIngredients = () => {
    handleGetData(selectedIngredients);
  };

  const handleAddRow = () => {
    handleAdd();
  };

  const handleDataFiltered = (filteredData: RowData[]) => {
    setSelectedIngredients([]);
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
            {selectedIngredients.length > 0 && (
              <IconButton onClick={handleAddIngredients}>
                <FastForwardIcon />
              </IconButton>
            )}
            {selectedIngredients.length === 0 && (
              <IconButton onClick={handleAddRow}>
                <AddCircleOutlineIcon />
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
