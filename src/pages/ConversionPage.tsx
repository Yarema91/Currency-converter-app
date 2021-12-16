import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import CurrencyContainer from "../components/CurrencyContainer";
import * as moment from 'moment/moment.js';


const ConversionPage = () => {


  const persistedHistory = localStorage.getItem('history') as any;
  const parsedHistory = JSON.parse(persistedHistory);
  const [history, setHistory] = useState(parsedHistory || [])

  useEffect(() => {
    if (history) {
      try {
        localStorage.setItem('history', JSON.stringify(history));
      } catch (err) {
        console.log(err);
      }
    }
  }, [history])

  var date = new Date();
  var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .split("T")[0];
  console.log(dateString);

  const onChangeAmount = (rate) => {

    setHistory([
      ...history,
      {
        id: history.length + 1,
        currency: rate.currency,
        amount: rate.amount,
        date: dateString
      }
    ]);

    console.log('click local');
  }

  return (
    <div className="row" style={{
      // background: "red",
      boxSizing: "border-box",
      margin: "auto",
      padding: "2em",
      display: "flex",
      alignItems: "flex-center",
      justifyContent: "center",
    }}>
      <Card className="col-md-4 ms-2 me-2 mt-3" style={{ width: "fit-content", minWidth: "500px", padding: "1.5em" }}>
        <CurrencyContainer onChange1={onChangeAmount} />
      </Card>

      <Card className=" col-md-4 ms-2 me-2 mt-3" style={{ width: "fit-content", minWidth: "500px", padding: "1.5em" }}>
        <table className="table table-borderless"
          style={{ alignItems: "flex-center", padding: "2.2em", alignContent: "center", }}
        // id="table"
        // data-toggle="table"
        // data-height="460"
        // data-url="json/data1.json"
        >
          <thead>
            <tr >
              <th >#</th>
              <th >Currency</th>
              <th >Amount</th>
              <th >Date</th>
              {/* <th >Delete</th> */}
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>

            {history.map((h) => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.currency}</td>
                {/* <td>{h.rate}</td> */}
                <td>{h.amount}</td>
                <td>{h.date}</td>
              </tr>
            ))}
            {/* <tr>
              <th scope="row">{row => row.next() }</th>
              <td>USD</td>
              <td>1</td>
              <td>RUB</td>
              <td>83.337146</td>
              <td>06.12.21</td>
              <td><i className="bi bi-trash"></i> </td>
            </tr> */}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ConversionPage;
function dateFormat() {
  throw new Error("Function not implemented.");
}

