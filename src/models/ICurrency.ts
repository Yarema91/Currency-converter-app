export interface ICurrency {
  id: number;
  isSuccess: boolean;
  base: string;
  date: Date;
  rates: {currency: string, rate: number};
}

