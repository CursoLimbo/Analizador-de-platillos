import React, { useState } from 'react';
import { TextField, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import ingredientsStyle from '../styles/Ingredients-register.module.css';



interface DataFilt {
  rows: RowData[];
  onDataFiltered: (filteredData: RowData[]) => void;
}

const DataFilter: React.FC<DataFilt> = ({ rows, onDataFiltered }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value;
    setSearchValue(filterValue);

    const filteredData = filterValue
      ? rows.filter((row) => row.name.toLowerCase().includes(filterValue.toLowerCase()))
      : rows;

    onDataFiltered(filteredData);
  };

  return (
    <Box className={ingredientsStyle.box}>
    <Stack className={ingredientsStyle.root}>
      <TextField
        id="search-bar"
        label="Buscar"
        variant="outlined"
        value={searchValue}
        onChange={handleChange}
        className={ingredientsStyle.textfield}
      />
    </Stack>
    </Box>
  );
};

export default DataFilter;
