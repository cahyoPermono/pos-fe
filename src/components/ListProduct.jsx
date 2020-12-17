import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import ProductService from "../services/ProductService";
import { useHistory } from 'react-router-dom';

const columns = [
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    format: (value) => value.toFixed(2),
  },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "barcode", label: "Barcode", minWidth: 100 },
  {
    id: "retailPrice",
    label: "Price",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "stocks",
    label: "Stock",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "unitOfMeasure",
    label: "Satuan",
    minWidth: 170,
    align: "right",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  button: {
    marginBottom: "5px",
  },
  tableTitle:{
    backgroundColor: theme.palette.common.monoGreen,
  }
}));

const ListProduct = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [products, setProducts] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    ProductService.getAllProduct().then(
      (response) => {
        if (!props.filter) {
          setProducts(response.data);
        } else {
          setProducts(
            response.data.filter((i) => {
              return (
                i.name.toUpperCase().includes(props.filter.toUpperCase()) ||
                (i.barcode && i.barcode.includes(props.filter))
              );
            })
          );
        }
      },
      (error) => {
        console.log(error)
        if (error.response.status && error.response.status === 401) {
          AuthService.logout();
          history.push('/login');
        }

        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        props.setMessage((p) => {
          return { message: _content, status: "error" };
        });
        if (error.response.status && error.response.status === "401") AuthService.logout();
        props.setOpenNotif(true);
        setProducts([]);
      }
    );
  }, [props,history]);

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className={classes.tableTitle}>
              {columns.map((column) => {
                if (column.id === "action" && !props.handleAdd) {
                  return null;
                }
                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      if (column.id === "action" && !props.handleAdd) {
                        return null;
                      }

                      const value =
                        column.id === "action" ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {return props.handleAdd(row)}}
                          >
                            Tambahkan
                          </Button>
                        ) : (
                          row[column.id]
                        );
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ListProduct;
