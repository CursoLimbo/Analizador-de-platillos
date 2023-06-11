import React from 'react';
import { TextField, Stack, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const styles = {
  root: {
      width: '95%',
      display : 'flex',
      flexDirection:'row',
      justifyContent:' center'
  },
  textfield : {
    width : '30%',
    ml : '12%'
  },
};

function SearchBar() {
  return (
    <Stack sx={styles.root} >
      <TextField id="search-bar" label="Search" variant="outlined" sx={styles.textfield} />
      <IconButton>
      <SearchIcon id='search-button' fontSize='large'/>
      </IconButton>
    </Stack>
  );
}

export default SearchBar;

