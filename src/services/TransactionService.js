import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/transaction/";

class TransactionService {

  createTransaction(newTransaction) {
    return axios.post(API_URL, newTransaction, { headers: authHeader() });
  }

  formatRupiah(angka, prefix) {
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
}

export default new TransactionService();
