import React from 'react';
import { TextField, Stack } from "@mui/material";

const styles = {
  root: {
    '& > *': {
      width: '25ch',
    },
  },
};

function SearchBar() {
  return (
    <Stack sx={styles.root} >
      <TextField id="search-bar" label="Search" variant="outlined" />
    </Stack>
  );
}

export default SearchBar;

