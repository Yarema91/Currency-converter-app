
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICurrency } from "../models/ICurrency";

export const currencyAPI = createApi({

    reducerPath: 'currencyAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.exchangerate.host/' }),
    endpoints: (build) => ({ 
        fetchAllRates: build.query<any, string>({
            query: (baseCurrency) => ({
                url: `/latest`,
                params: {
                    base: baseCurrency
                }
            
            }),

        }),
        fetchChangeDate: build.query<any, string>({
            query: (changeDate) => ({
                url: `/date=${changeDate}`,
                params: {
                    date: changeDate
                }
            }),
        }),

})
})