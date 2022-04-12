import React, { useEffect, useState } from 'react';
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
import Input from '../components/Input';
import settings from '../settings';
import DatePicker from "react-datepicker";
import { Card } from 'react-bootstrap';
import { currencyAPI } from '../services/CurrencyService';
// import { KeyObject } from 'crypto';
// import { selectorSlice } from '../store/SelectedCurencySlice';

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
    },
  },
};




export default function GraphPage() {

  const [baseCurrency, setBaseCurrency] = useState<{ code: string }>({ code: settings.baseCurrency });

  const [startDate, setStartDate] = useState(new Date());  //view change date1
  const startDateForRecquest = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`

  const [endDate, setEndDate] = useState(new Date());
  const endDateForRecquest = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`

  const { data: dataG, error: errorGraph, isLoading: isLoadingGraph } = currencyAPI.useFetchGraphQuery<any>({ baseCurrency: baseCurrency.code, startDateGraph: startDateForRecquest, endDateGraph: endDateForRecquest });



  const chartData = {
    labes: [],
    datasets: []
  } as any;

  let currencyData = {
    render: false,
    rates: {}
  };

  // useEffect(() => {
  //localstorage
  const persistedSelectorCurrency = localStorage.getItem('currencyList') as string;
  const parsedCurrency = JSON.parse(persistedSelectorCurrency);

  const selectedCurrencyList = [] as any;
  parsedCurrency.forEach(element => {
    selectedCurrencyList.push(element.value);
  });
  // console.log('selectedCurrencyList', selectedCurrencyList);
  // }), [];




  if (dataG && dataG.rates) {
    const dates = Object.keys(dataG.rates);
    chartData.labels = dates;

    currencyData = Object.assign(currencyData, dataG)
    currencyData.render = true;



    selectedCurrencyList.forEach((currency, index) => {
      let chartItem = {
        label: '',
        data: [] as any,
        backgroundColor: '' as string
      }
      chartItem.label = currency;

      dates.forEach(date => {

        chartItem.label = currency;
        chartItem.data.push(currencyData.rates[date][currency])
      });

      chartData.datasets.push(chartItem);
    });
  }


  const handleSelectCurrency = (e) => {
    const selectValue = e.target.value;
    setBaseCurrency({ code: selectValue })
  }

  return (
    <div className="row" style={{
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
        ) : isLoadingGraph ? (
          <h1>Loading...</h1>
        ) : null}
      </div>

      <Card
        className="col-md-4 ms-2 me-2 mt-3"
        style={{
          width: "fit-content",
          minWidth: "500px",
          padding: "1.5em",
          margin: "auto"
        }}
      >
        <div
          id="toolbar"
          className="container"
          style={{
            display: "contants",
            paddingBlockEnd: "0.4em",
          }}
        >
          <div
            className="container"
            style={{
              display: "contants",
              paddingBlockStart: "1em",
            }}
          >
            <div
              className=" d-flex justify-content-center "
              style={{ flexWrap: "inherit" }}
            >
              <Input
                onChange={handleSelectCurrency}
                value={baseCurrency.code}
              />
              <DatePicker
                className=" me-2 p-1 "
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <DatePicker
                className=" me-2 p-1 mw-auto"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
        </div>
      </Card>
      {isLoadingGraph && <h1 className='align-content-sm-center'>Loading date with graph...</h1>}
      {errorGraph && <h1>Error download date with graph...</h1>}
      <Line
        style={{
          width: "fit-content",
          margin: "auto",
          paddingLeft: "2em",
          padding: "2em",
          display: "flex",
          alignItems: "flex-center",
          justifyContent: "center"
        }}
        options={options}
        data={chartData}
      />
    </div>
  )
}
