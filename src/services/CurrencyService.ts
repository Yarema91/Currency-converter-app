
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICurrency } from "../models/ICurrency";

type ChangDateArgs = { baseCurrency: string, changeDate: string,};
type GraphArgs = { baseCurrency: string, startDateGraph: string, endDateGraph: string};


export const currencyAPI = createApi({

    reducerPath: 'currencyAPI',
    tagTypes: ['Currency'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.exchangerate.host/' }),
    endpoints: (build) => ({ 
        fetchAllRates: build.query<any, string>({
            query: (baseCurrency) => ({
                url: `/latest`,
                params: {
                    base: baseCurrency
                },
                providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Currency' as const, id })),
              { type: 'Currency', id: 'LIST' },
            ]
          : [{ type: 'Currency', id: 'LIST' }],

            }),
        }),
        fetchChangeDate: build.query<any, ChangDateArgs>({
            query: (changDateArgs: ChangDateArgs) => { 
                const nowDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
                const isLatest = (nowDate === changDateArgs.changeDate);

                return ({
                url: isLatest ? `/latest` : `/${changDateArgs.changeDate}`,
                params: {
                    base: changDateArgs.baseCurrency
                }
            })},
        }),

        fetchGraph: build.query<any, GraphArgs>({
            query: (graphArgs: GraphArgs) => ({ 
  
                url: `/timeseries`,
                params: {
                    base: graphArgs.baseCurrency,
                    start_date: graphArgs.startDateGraph,
                    end_date: graphArgs.endDateGraph
                }
        }),
        }),
})
})