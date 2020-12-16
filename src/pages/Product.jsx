import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ProductService from "../services/ProductService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ListProduct from "../components/ListProduct";
import Notif from "../components/Notif";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  button: {
    marginBottom: "5px",
  },
});

export default function Product() {
  const classes = useStyles();
  const [openNotif, setOpenNotif] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [message, setMessage] = useState({ status: "", message: "" });
  const [request, setRequest] = useState({});

  const [query, setQuery] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);

    if (!request.name) return;
    createProduct();
  };

  function createProduct() {
    ProductService.createProduct(request).then(
      (response) => {
        setMessage({
          status: "success",
          message: "Berhasil Menambahkan Product",
        });
        setOpenNotif(true);
        setRequest({});
        setQuery(true);
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

  function handleChange(e) {
    const { name, value } = e.target;

    setRequest((p) => {
      return { ...p, [name]: value };
    });
  }

  function handleClick(e) {
    setQuery(false);
    setOpenDialog(true);
  }

  return (
    <div>
      <Button
        name="addProduct"
        className={classes.button}
        variant="contained"
        onClick={handleClick}
      >
        <AddIcon className={classes.extendedIcon} />
        Tambah
      </Button>
      <Paper className={classes.root}>
        <ListProduct
          query={query}
          setMessage={setMessage}
          setOpenNotif={setOpenNotif}
        />
      </Paper>
      <Notif
        message={message}
        openNotif={openNotif}
        setOpenNotif={setOpenNotif}
      />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Tambah Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={request.name || ""}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="barcode"
            id="barcode"
            label="Barcode"
            type="text"
            fullWidth
            value={request.barcode || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="basePrice"
            id="basePrice"
            label="Base Price"
            type="number"
            fullWidth
            value={request.basePrice || ""}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="retailPrice"
            id="retailPrice"
            label="Retail Price"
            type="number"
            fullWidth
            value={request.retailPrice || ""}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="stocks"
            id="stocks"
            label="Stocks/Ketersediaan"
            type="number"
            fullWidth
            value={request.stocks || ""}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="unitOfMeasure"
            id="unitOfMeasure"
            label="Satuan"
            type="text"
            fullWidth
            value={request.unitOfMeasure || ""}
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
