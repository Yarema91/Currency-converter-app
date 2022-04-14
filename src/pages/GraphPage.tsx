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
import { string } from 'prop-types';


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

  const [startDate, setStartDate] = useState(new Date());
  const startDateForRecquest = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`

  const [endDate, setEndDate] = useState(new Date());
  const endDateForRecquest = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`

  const { data: dataG, error: errorGraph, isLoading: isLoadingGraph } = currencyAPI.useFetchGraphQuery({ baseCurrency: baseCurrency.code, startDateGraph: startDateForRecquest, endDateGraph: endDateForRecquest });



  const chartData = {
    labes: [],
    datasets: []
  } as any;

  let currencyData = {
    render: false,
    rates: {}
  };



  //localstorage
  const persistedSelectorCurrency = localStorage.getItem('currencyList') as string;
  const parsedCurrency = JSON.parse(persistedSelectorCurrency);


  const selectedArr = [] as any;
  parsedCurrency.forEach(element => {
    selectedArr.push(element.value);
  });

  const [selectedCurrencyList, setSelectedCurrencyList] = useState(selectedArr || []) as any;

  // useEffect(() => {
  //   if (selectedArr !== selectedCurrencyList) {
  //     setSelectedCurrencyList(selectedArr)
  //   }
  // }, []
  // )

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
    <div className="row">
      {errorGraph ? (<>Oh no, there was an error</>)
        : isLoadingGraph
          ? (<h1>Loading...</h1>)
          : null
      }
      <Card className="col-md-4">
        <div className="input-panel">
          <Input
            onChange={handleSelectCurrency}
            value={baseCurrency.code}
          />
          <DatePicker
            className="date-picker"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <DatePicker
            className="date-picker"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
      </Card>
      {isLoadingGraph && <h1 className='align-content-sm-center'>Loading date with graph...</h1>}
      {errorGraph && <h1>Error download date with graph...</h1>}
      <Line
        className='graph-line'
        options={options}
        data={chartData}
      />
    </div>
  )
}