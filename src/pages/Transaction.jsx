import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import ListProduct from "../components/ListProduct";
import Notif from "../components/Notif";
import SearchBox from "../components/SearchBox";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import TransactionService from "../services/TransactionService";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 700,
  },
  button: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  tableTitle: {
    backgroundColor: theme.palette.common.monoGreen,
  },
}));

// const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, quantity, unitPrice, discount, productId) {
  const price = priceRow(quantity, unitPrice);
  return { desc, quantity, unitPrice, price, discount, productId };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

function Transaction(props) {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogBayar, setOpenDialogBayar] = useState(false);
  const [filter, setFilter] = useState("");
  const [openNotif, setOpenNotif] = useState(false);
  const [message, setMessage] = useState({ status: "", message: "" });
  const [transaction, setTransaction] = useState({});
  const [details, setDetails] = useState([]);
  const [custMoney, setCustMoney] = useState("");
  const [custChange, setCustChange] = useState("");

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFilter("");
  };

  const handleAdd = (item) => {
    const itemToAdd = createRow(item.name, 1, item.retailPrice, 0, item.id);
    const indexItem = details.findIndex((item) => {
      return item.productId === itemToAdd.productId;
    });
    if (indexItem !== -1) {
      setDetails((p) => {
        const newItem = [...p];

        //update quantity and price subtotal
        newItem[indexItem].quantity = newItem[indexItem].quantity + 1;
        newItem[indexItem].price = priceRow(
          newItem[indexItem].quantity,
          newItem[indexItem].unitPrice
        );

        return newItem;
      });
    } else {
      setDetails((p) => {
        return [...p, itemToAdd];
      });
    }

    setMessage({ status: "success", message: "Berhasil Menambahkan Barang" });
    setOpenNotif(true);
    setOpenDialog(false);
  };

  function addQty(idx) {
    console.log(idx);
    setDetails((p) => {
      const newItem = [...p];

      console.log(newItem);

      //update quantity and price subtotal
      newItem[idx].quantity = newItem[idx].quantity + 1;
      newItem[idx].price = priceRow(
        newItem[idx].quantity,
        newItem[idx].unitPrice
      );

      return newItem;
    });
  }

  function reduceQty(idx) {
    if (details[idx].quantity === 0) {
      return;
    }

    setDetails((p) => {
      const newItem = [...p];

      //update quantity and price subtotal
      newItem[idx].quantity = newItem[idx].quantity - 1;
      newItem[idx].price = priceRow(
        newItem[idx].quantity,
        newItem[idx].unitPrice
      );

      return newItem;
    });
  }

  function formatRupiah(angka, prefix) {
    let number_string = angka
        .toString()
        .replace(/[^,\d]/g, "")
        .toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }

  const handleSearch = (value) => {
    setFilter(value);
  };

  const handleDialogBayar = () => {
    setOpenDialogBayar(true);
    

    // set transactions
    const thisTime = new Date();
    console.log(thisTime);
    setTransaction({
      customerId: null,
      total: invoiceTotal,
      date: moment(new Date()).format('YYYY-MM-DD HH:mm'),
      transDetails: details,
    });
  };

  const invoiceSubtotal = subtotal(details);
  // const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTaxes = 0;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  function handleTransaction() {
    if (details.length === 0) {
      setMessage({ status: "error", message: "Tidak ada Barang Yang dibeli" });
      setOpenNotif(true);
      return;
    }

    console.log(details.length > 0 ? true : false);
    console.log(transaction);

    TransactionService.createTransaction(transaction).then(
      (response) => {
        setMessage({
          status: "success",
          message: "Berhasil Melakukan Transaksi",
        });
        setOpenNotif(true);
        setTransaction({});
        setDetails([]);
        setOpenDialogBayar(false);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage({ status: "error", message: _content });
        setOpenNotif(true);
      }
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
              <TableHead>
                <TableRow className={classes.tableTitle}>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                  <TableCell align="right">Harga</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Nama Barang</TableCell>
                  <TableCell align="right">Jumlah</TableCell>
                  <TableCell align="right">Harga Barang</TableCell>
                  <TableCell align="right">Jumlah Harga</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details.map((row, idx) => (
                  <TableRow key={row.desc}>
                    <TableCell>{row.desc}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        name="reduce"
                        size="small"
                        color="primary"
                        aria-label="add to shopping cart"
                        onClick={(e) => reduceQty(idx)}
                      >
                        <KeyboardArrowDownIcon />
                      </IconButton>
                      {row.quantity}
                      <IconButton
                        name="add"
                        size="small"
                        color="primary"
                        aria-label="add to shopping cart"
                        onClick={(e) => addQty(idx)}
                      >
                        <KeyboardArrowUpIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">{row.unitPrice}</TableCell>
                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Total Harga Barang</TableCell>
                  <TableCell align="right">
                    {ccyFormat(invoiceSubtotal)}
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                    0
                  )} %`}</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={() => setOpenDialog(true)}
              >
                Tambah Barang
              </Button>
            </div>
            <div>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={handleDialogBayar}
              >
                Bayar
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
      {/* Dialog for pembayaran */}
      <Dialog
        open={openDialogBayar}
        onClose={() => {
          setCustChange("");
          setCustMoney("");
        }}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle align="center" id="form-dialog-title">
          Pembayaran
        </DialogTitle>
        <DialogContent>
          <Typography variant="h4" style={{ marginBottom: "20px" }}>
            Total Belanja : {formatRupiah(invoiceTotal, "Rp.")}
          </Typography>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">
              Uang Bayar
            </InputLabel>
            <OutlinedInput
              autoFocus
              id="outlined-adornment-amount"
              type="number"
              value={custMoney}
              onChange={(e) => {
                const { value } = e.target;
                setCustMoney(value);
                setCustChange(value - invoiceTotal);
              }}
              startAdornment={
                <InputAdornment position="start">Rp</InputAdornment>
              }
              labelWidth={90}
            />
            <Typography variant="h4" style={{ margin: "20px 20px" }}>
              Total Kembalian : {formatRupiah(custChange, "Rp.")}
            </Typography>
          </FormControl>
          <Button color="secondary" onClick={handleTransaction}>
            Bayar
          </Button>
        </DialogContent>
      </Dialog>

      {/* For adding product */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth={false}
      >
        <DialogTitle id="form-dialog-title">Tambah Product</DialogTitle>
        <DialogContent>
          <SearchBox placeholder="Search Product" handleSearch={handleSearch} />
          <ListProduct
            filter={filter}
            setMessage={setMessage}
            setOpenNotif={setOpenNotif}
            handleAdd={handleAdd}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Notif
        message={message}
        openNotif={openNotif}
        setOpenNotif={setOpenNotif}
      />
    </div>
  );
}

export default Transaction;
