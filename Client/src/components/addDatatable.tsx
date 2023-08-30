import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box/Box";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import DataFilter from "./dataFilter";

interface DataGridProps {
  dataRows: RowData[];
  columns: GridColDef[];
  dataVersion: number;
}

const AddDataGridInfo: React.FC<DataGridProps> = ({
  dataRows,
  columns,
  dataVersion,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filteredRows, setFilteredRows] = useState<RowData[]>(dataRows);
  const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
    const selectedRowIds = rowSelectionModel.map((id) => String(id));
    setSelectedIds(selectedRowIds);
  };

  const handleDataFiltered = (filteredData: RowData[]) => {
    setSelectedIds([]);
    setFilteredRows(filteredData);
  };

  useEffect(() => {
    setFilteredRows(dataRows);
  }, [dataVersion, dataRows]);
  

  return (
    <Box 
    width={600}>
      <DataFilter rows={dataRows} onDataFiltered={handleDataFiltered} />
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
        
          }}
        ></Box>

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
