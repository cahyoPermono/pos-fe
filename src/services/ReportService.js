import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/report/";

class ReportService {
  getTransactionReportByMonthAndYear(month, year) {
    return axios.get(API_URL + `transaction/month/${month}/year/${year}`, {
      headers: authHeader(),
    });
  }
}

export default new ReportService();
