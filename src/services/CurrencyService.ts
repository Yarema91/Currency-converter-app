
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICurrency } from "../models/ICurrency";

type ChangDateArgs = {baseCurrency: string, changeDate: string,};
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
        fetchChangeDate: build.query<any, ChangDateArgs>({
            query: (changDateArgs: ChangDateArgs) => { 
                const nowDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
                var isLatest = (nowDate == changDateArgs.changeDate);
                
                return ({
                url: isLatest ? `/latest`  : `/${changDateArgs.changeDate}`,
                params: {
                    base: changDateArgs.baseCurrency
                }
            })},
        }),

})
})