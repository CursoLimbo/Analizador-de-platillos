import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { redirect } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { visuallyHidden } from '@mui/utils';
import { useGetAllIngredients } from '@/hooks/services/Ingredients';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import ingredientsStyle from '@/styles/ingredients.module.css'
import { TextField,Stack } from '@mui/material';



interface Ingredient {
  supplier : string,
  productMultiplyByTwo : number,
  presentation : number,
  performancePercentage : number,
  performance : number,
  name : string,
  mermado : string,
  id: string,
  costPerGram: number
}

const CreateData = (): Ingredient[] => {
  const [rows, setRows] = useState<Ingredient[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const rowsData = useGetAllIngredients();
  
  useEffect(() => {
    if (rowsData.data) {
      setRows(rowsData.data.GetAllIngredients.slice());
      setDataLoaded(true);
    }
  }, [rowsData]);
  
  if (!dataLoaded) {

    return []; 
  }

  return rows;
};

const FilteredDataComponent = ({ data ,filter }: { data: Ingredient[]; filter: string }) => {
  const filteredData = useMemo(() => {
    if (filter === '') {
      return data;
    } else {
      return data.filter(row => row.name.toLowerCase().includes(filter.toLowerCase()));
    }
  }, [data, filter]);

  return filteredData;
}




function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof Ingredient;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    label: 'Id',
  },
  {
    id: 'name',
    label: 'Nombre',
  },
  {
    id: 'presentation',
    label: 'Presentación',
  },
  {
    id: 'costPerGram',
    label: 'Costo por gramo',
  },
  {
    id: 'supplier',
    label: 'Distribuidor',
  },
  {
    id: 'performance',
    label: 'Rendimiento',
  },
  {
    id: 'performancePercentage',
    label: 'Rendimiento %',
  },
  {
    id: 'mermado',
    label: 'Precio Mermado',
  },
  {
    id: 'productMultiplyByTwo',
    label: 'Producto X2',
  },
];

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'id';
const DEFAULT_ROWS_PER_PAGE = 5;

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, newOrderBy: keyof Ingredient) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (newOrderBy: keyof Ingredient) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, newOrderBy);
    };

  return (
    <TableHead>
      <TableRow className={ingredientsStyle.tableHead}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleEditClick: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected,handleEditClick } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%',marginBottom: '2%' }}
          variant="h2"
          id="tableTitle"
          component="div"
        >
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
        {numSelected ===1 && (      
        <Tooltip title="Editar">
          <IconButton href='Ingredient-Update'>
            <EditIcon fontSize='large'/>
          </IconButton>
        </Tooltip>)}
        
        <Tooltip title="Eliminar">
        <IconButton>
          <DeleteIcon fontSize='large'/>
        </IconButton>
        </Tooltip>
        </>
        
      ) : (
        <Tooltip title="Crear">
          <IconButton href='Ingredients-Register'>
            <AddCircleIcon fontSize='large'  />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
///////////////////////////////////////////////////////////////////////////////
const Ingredients:React.FunctionComponent =() =>  {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchValue(event.target.value);
  };
  
  const [order, setOrder] = React.useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState<keyof Ingredient>(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [visibleRows, setVisibleRows] = React.useState<Ingredient[] | null>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const data= CreateData();
  const rows = FilteredDataComponent({ data: data, filter: searchValue });

  React.useEffect(() => {
    let rowsOnMount = stableSort(rows, getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY));
    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );
 
    setVisibleRows(rowsOnMount);
  }, [rows]);

  const handleRequestSort = React.useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof Ingredient) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage,rows]
  );

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);    
    console.log('selected')
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelectedId(id);
    console.log(selectedId);
    setSelected(newSelected);

  };

  const handleEditClick = () => {
    console.log(selectedId+'edit');
    redirect(`Ingredient-Update/:${selectedId}`);
  }

  const handleChangePage = React.useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );
      setVisibleRows(updatedRows);

      const numEmptyRows = newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, dense, rowsPerPage,rows]
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );
      setVisibleRows(updatedRows);

      setPaddingHeight(0);
    },
    [order, orderBy,rows]
  );

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: '100%'  }}>
      <NavBar isHome={false} />
      <h1 className={ingredientsStyle.tableTitle}>Ingredientes</h1>
      <Stack className={ingredientsStyle.root} >
        <TextField id="search-bar" 
          label="Search" variant="outlined"
          value={searchValue}
          onChange={handleChange} 
          className={ingredientsStyle.textfield} />
        </Stack>
      {rows.length !== 0 ? (
        <Paper sx={{ width: '100%', mb: 2, minHeight: '80vh' }}>
          <EnhancedTableToolbar numSelected={selected.length} handleEditClick={handleEditClick}/>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows
                  ? visibleRows.map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                          sx={{ cursor: 'pointer'}}
                          className={ingredientsStyle.tableRow}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId
                              }}
                            />
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                            {row.id}
                          </TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.presentation}</TableCell>
                          <TableCell align="center">{row.costPerGram}</TableCell>
                          <TableCell align="center">{row.supplier}</TableCell>
                          <TableCell align="center">{row.performance}</TableCell>
                          <TableCell align="center">{row.performancePercentage}</TableCell>
                          <TableCell align="center">{row.mermado}</TableCell>
                          <TableCell align="center">{row.productMultiplyByTwo}</TableCell>
                        </TableRow>
                      );
                    })
                  : null}
                {paddingHeight > 0 && (
                  <TableRow style={{ height: paddingHeight }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ): (
        <div>Cargando...</div>
      )}

      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
      <Footer />
    </Box>
  );
}

export default Ingredients;