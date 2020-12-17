import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  VictoryChart,
  VictoryLegend,
  VictoryTheme,
  VictoryAxis,
  VictoryBar,
  VictoryTooltip,
  VictoryPie,
  VictoryLabel,
} from "victory";
import Notif from "../components/Notif";
import AuthService from "../services/AuthService";
import ReportService from "../services/ReportService";
import moment from "moment";
import TransactionService from "../services/TransactionService";

export default function Dashboard() {
  const [mReport, setMReport] = useState([]);
  const [pReport, setPReport] = useState([]);
  const [message, setMessage] = useState({ status: "", message: "" });
  const [openNotif, setOpenNotif] = useState(false);

  useEffect(() => {
    const now = new Date();
    ReportService.getTransactionReportByMonthAndYear(
      now.getMonth() + 1,
      now.getFullYear()
    ).then(
      (response) => {
        setPReport(getTotalBuyByProduct(response.data));
        setMReport(getResultTotal(response.data));
      },
      (error) => {
        if (error.response.status && error.response.status === 401) {
          AuthService.logout();
        }

        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage((p) => {
          return { message: _content, status: "error" };
        });
        if (error.response.status && error.response.status === "401")
          AuthService.logout();
        setOpenNotif(true);
        setMReport([]);
      }
    );
  }, []);

  function getTotalBuyByProduct(data) {
    //get all transaction details from list transactions
    const dataProduct = data.reduce((acc, item) => {
      console.log(acc);
      console.log(item.transactionDetails);
      acc = acc.concat(item.transactionDetails);
      return acc;
    }, []);

    console.log(dataProduct);
    //extract data we need for pie chart
    const dataPie = dataProduct.reduce((acc, item) => {
      acc[item.productName] = (acc[item.productName] || 0) + item.quantity;
      return acc;
    }, {});

    console.log(dataPie);

    //mapping agar sesuai dengan pie chart
    const hasil = Object.keys(dataPie).map((item) => {
      return {
        x: item,
        y: dataPie[item],
      };
    });

    console.log(hasil);

    return hasil;
  }

  function getResultTotal(data) {
    const reduce = data.reduce((acc, item) => {
      const time = new Date(item.date);
      const strTime = moment(time).format("DD/MMM/YYYY");
      acc[strTime] = (acc[strTime] || 0) + item.total;
      return acc;
    }, {});

    const hasil = Object.keys(reduce).map((item) => {
      return {
        hari: item,
        total: reduce[item],
        label: TransactionService.formatRupiah(reduce[item]),
      };
    });

    return hasil;
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <VictoryChart domainPadding={30} theme={VictoryTheme.material}>
            <VictoryLegend
              x={80}
              y={25}
              title="Total Penjualan Kotor"
              centerTitle
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
              data={[]}
            />
            <VictoryAxis />
            <VictoryAxis
              dependentAxis
              // tickFormat specifies how ticks should be displayed
              tickFormat={(x) => `${x / 1000}k`}
            />
            <VictoryBar
              labelComponent={<VictoryTooltip />}
              data={mReport}
              // data accessor for x values
              x="hari"
              // data accessor for y values
              y="total"
            />
          </VictoryChart>
        </Grid>
        <Grid item xs={6}>
        
          <VictoryPie
            padding={100}
            theme={VictoryTheme.material}
            data={pReport}
            colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
            labels={true}
            labelComponent={
              <VictoryLabel
                text={({ datum }) => [`${datum.x}`, `${datum.y}`]}
                style={{ fontSize: "12" }}
              />
            }
          />
        </Grid>
      </Grid>
      <Notif
        message={message}
        openNotif={openNotif}
        setOpenNotif={setOpenNotif}
      />
    </div>
  );
}
