import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import CurrencyContainer from "../containers/CurrencyContainer";
import { ICurrency } from "@src/models/ICurrency";


const ConversionPage = () => {
  const persistedHistory = localStorage.getItem('history') as string;
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

  const date = new Date();
  const convertTime = 60000;
  const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * convertTime))
    .toISOString()
    .split("T")[0];

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
  }

  return (
    <div className="row">
      <Card className="col-md-4">
        <CurrencyContainer onChange={onChangeAmount} />
      </Card>
      <Card className="col-md-4">
        <table className="table table-borderless" >
          <thead>
            <tr >
              <th >#</th>
              <th >Currency</th>
              <th >Amount</th>
              <th >Date</th>
            </tr>
          </thead>
          <tbody
          >
            {history.map((h) => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.currency}</td>
                <td>{h.amount}</td>
                <td>{h.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ConversionPage;

