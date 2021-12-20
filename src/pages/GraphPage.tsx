
import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import CurrencyInput from '../components/CurrencyInput';
import settings from '../settings';
// import faker from 'faker';

import DatePicker from "react-datepicker";
import { Card } from 'react-bootstrap';
import { currencyAPI } from '../services/CurrencyService';
import { KeyObject } from 'crypto';
import currencyLine from '../components/currencyLine';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

// export const data = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // currency ranges
//   datasets: [
//     {
//       label: 'Dataset 1', // currency
//       // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       data: [.5, 1, 1, 1, 1, 1, 1], // currency rates
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       data: [2, 2, 2, 1, 1, 1, 1],

//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// console.log('datasets', data.datasets.map(i => i.data));

export default function GraphPage() {

  const [baseCurrency, setBaseCurrency] = useState<{ code: string }>({ code: settings.baseCurrency });

  const [startDate, setStartDate] = useState(new Date());  //view change date1
  const startDateForRecquest = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`

  const [endDate, setEndDate] = useState(new Date());
  const endDateForRecquest = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`

  const { data: dataG, error: errorGraph, isLoading: isLoadingGraph } = currencyAPI.useFetchGraphQuery<any>({ baseCurrency: baseCurrency.code, startDateGraph: startDateForRecquest, endDateGraph: endDateForRecquest });

//localstorage
  const persistedSelectorCurrency = localStorage.getItem('currencyList') as any;
  const parsedCurrency = JSON.parse(persistedSelectorCurrency);
  const [history, setHistory] = useState(parsedCurrency || [])
  console.log('parsedCurrency', parsedCurrency);
  const [currencyList, setCurrencyList] = useState(parsedCurrency || []);
  

  let chartData = {
    labes: [],
    datasets: []
  } as any;

console.log('redner')

let currencyData = {
  render: false,
  rates: {}
};

  if (dataG && dataG.rates) {
    const dates = Object.keys(dataG.rates);
    chartData.labels = dates;

    currencyData = Object.assign(currencyData, dataG)
    currencyData.render = true;

    // labes => dates
    // currencyLabels => settings.currencyList

    // settings.currencyList.forEach((currency, index) => {
      parsedCurrency.forEach((currency, index) => {

      let chartItem = {
        label: '',
        data: [] as any,
        backgroundColor: '' as string
      }

      // assign label
      chartItem.label = currency;

      dates.forEach(date => {

        // assign label to chart line
        chartItem.label = currency;

        chartItem.data.push(currencyData.rates[date][currency])
      });

      chartData.datasets.push(chartItem);

      // add backgroundColor
      // backgroundColor: 'rgba(255, 99, 132, 0.5)',

    });

    // Потрібно створити обєкт chartData із обєктами chartItem де є масив(datasets, labels(масив дат))
    // datasets це кількість масививів з вибрані currency, де data це масив rates
    // 
    //1. знаходимо dataG
    //2. умова якщо база є тоді заходимо в dataG.rates - вибрані дати з масивами rates де ключі це dates

    //3. записуєм dates  в chartData => chartItem => labels і chartItem => date додаєм
    //4. обєднуємо  currencyData  і dataG
// 5.  Перебираємо settings.currencyList, де  обявляєм  chartItem. де chartItem.label  це валюти
//6. dates перебираємо і в кожні із ітерацій в label записуєм currency,а в date додаєм currencyData.rates.date.currency
//7. і кожен з масивів chartItem додаєм в  chartData.datasets
    console.log('chart data', chartData);

  }
            

  // setTimeout(() => {
  //   console.log('dataG.rates', dataG.rates);
  
  //   }, 0) 

//   const dateRange = Object.keys(data.rates);
// console.log(dateRange); 

  // var findRates;
  //   if (dataG) {
  //     findRates = settings.currencyList
  //           .filter(x => x != baseCurrency.code)
  //           .map(x => ({
  //               currency: x,
  //               rateG: dataG.rates.dateDay[x],
  //           }))
  //   }

  // console.log('findRates', findRates);


  // console.log(baseCurrency);


  const handleSelectCurrency = (e) => {
    const selectValue = e.target.value;
    setBaseCurrency({ code: selectValue })
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
    <div className="App">
          {errorGraph ? (
            <>Oh no, there was an error</>
          ) : isLoadingGraph? (
            <h1>Loading...</h1>
          ) : null}
        </div>

      {/* {errorGraph ? (
        <>Oh no, there was an error</>
      ) : isLoadingGraph ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{dataG[0]}</h3>

        </>
      ) : null} */}


      <Card className="col-md-4 ms-2 me-2 mt-3" style={{ width: "fit-content", minWidth: "500px", padding: "1.5em", margin: "auto" }}>
        <div id="toolbar" className="container" style={{
          display: "contants",
          // alignItems: "flex-center",
          // paddingBlockStart: "1em",
          paddingBlockEnd: "0.4em",
        }}
        >
          <div className="container" style={{
            display: "contants",
            // alignItems: "flex-center",
            paddingBlockStart: "1em",
            // paddingBlockEnd: "2.2em",
          }}
          >
            <div className=" d-flex justify-content-center " style={{ flexWrap: "inherit" }}>
              <CurrencyInput onChange={handleSelectCurrency} value={baseCurrency.code} />
              {/* {isLoadingDate && <h1>Loading date...</h1>}
                            {errorDate && <h1>Error date download...</h1>} */}
              <DatePicker className=" me-2 p-1 " selected={startDate} onChange={(date) => setStartDate(date)} />
              {/* {endDateisLoading && <h1>Loading end date...</h1>}
                            {endDateError && <h1>Error end date download...</h1>} */}
              <DatePicker className=" me-2 p-1 mw-auto" selected={endDate} onChange={(date) => setEndDate(date)} />

              {/* <button className="btn btn-outline-primary  " type="button" >Quantify</button> */}
            </div>
          </div>

        </div>
      </Card>

      {isLoadingGraph && <h1 className='align-content-sm-center'>Loading date with graph...</h1>}
      {errorGraph && <h1>Error download date with graph...</h1>}
      <Line style={{
        width: "fit-content",
        //  boxSizing: "border-box",
        margin: "auto",
        paddingLeft: "2em",
        padding: "2em",

        display: "flex",
        alignItems: "flex-center",
        justifyContent: "center"
      }} options={options} data={chartData} />
      {/* }} options={options} data={data} /> */}
    </div>



  )

}
