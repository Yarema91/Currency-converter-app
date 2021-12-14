import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
// import { decrease, increase } from "./counter/counterSlice";
// import { useAppSelector } from "../hooks/redux";

import { Card } from "react-bootstrap";
// import { Bar } from "react-chartjs-2";
import CurrencyContainer from "../components/CurrencyContainer";



const ConversionPage = () => {

  // const value = useAppSelector(state => state.counterReducer.value);
  // const dispatch = useDispatch();



  //   const persistedHistory = localStorage.getItem('history') as any;
  //   const parsedHistory = JSON.parse(persistedHistory || []);
  //   useEffect(() => {
  //     localStorage.setItem('history', JSON.stringify(history));    
  // }, [history])
  

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
        <CurrencyContainer />
      </Card>

      <Card className=" col-md-4 ms-2 me-2 mt-3" style={{ width: "fit-content", minWidth: "500px", padding: "1.5em" }}>
        <table className="table table-borderless"
          style={{ alignItems: "flex-center", padding: "2.2em", alignContent: "center", }}
          id="table"
          data-toggle="table"
          data-height="460"
          data-url="json/data1.json">
          <thead>
            <tr >
              <th data-field="name">#</th>
              <th data-field="price">Currency</th>
              <th data-field="price">Amount</th>
              <th data-field="date">Date</th>
              <th data-field="operate" data-formatter="operateFormatter" data-events="operateEvents">Delete</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {/* <tr>   
              <td>1</td>
              <td>USD</td>
              <td>144.54</td>
              <td>07.12.21</td>
              <td><i className="bi bi-trash mr-2"></i></td>
            </tr> */}
            {/* {history.map((h) => (
                            <tr key={h.id}>
                                <td>{h.id}</td>
                                <td>{h.currency}</td>
                                <td>{h.amount}</td>
                                <td>{h.date}</td>
                            </tr>
                        ))} */}
            {/* <tr>
              <th scope="row">{row => row.next() }</th>
              <td>USD</td>
              <td>1</td>
              <td>RUB</td>
              <td>83.337146</td>
              <td>06.12.21</td>
              <td><i className="bi bi-trash"></i> </td>
            </tr>
            <tr>
             
              <td>USD</td>
              <td>1</td>
              <td>KZT</td>
              <td>492.31934</td>
              <td>05.12.21</td>
              <td><i className="bi bi-trash"></i> </td>
            </tr> */}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ConversionPage;
