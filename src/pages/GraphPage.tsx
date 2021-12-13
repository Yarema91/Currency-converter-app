import React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "../components/counter/counterSlice";
import { useAppSelector } from "../hooks/redux";
import CurrencyContainer from "../components/CurrencyContainer";

import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";


const HomePage = () => {

  // const value = useAppSelector(state => state.counterReducer.value);
  // const dispatch = useDispatch();

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

      <h2>Graph Page</h2>

      {/* <Card style={{ width: "fit-content", minWidth: "500px", padding: "1em" }}>
        <div className="chart">
          <div className="chart__header d--flex a--center j--spaceBetween mb--40">
            <h1 className="fw--light">Exchange rate</h1>
            <div className="chart__header__rate">
              <p className="fw--medium">
                { 1 {fromBase} = {baseToValue} {toBase} }
              </p>
            </div>
          </div>
          { {Data ? <BarChartComponent data={Data} /> : <>Loading</>} }
          {<Bar
        width={600}
        height={400}
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "months",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: "red",
            },
          ],
        }}
      /> }
          { <Bar
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apl', 'May'],
            datasets: [{
              data:[100, 200, 300, 400, 500]
            }]
          }}

        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem) {
                return `R$ ${tooltipItem.yLabel.toFixed(2)}`
              },
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  offsetGridLines: false,
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                },
              },
            ],
        
            yAxes: [
              {
                ticks: {
                  maxTicksLimit: 10,
                },
              },
            ],
          },
        }}
      /> }
        </div>
      </Card> }

      */}
    </div>
  );
};

export default HomePage;
