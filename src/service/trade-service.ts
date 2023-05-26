import { createService } from './core';

interface PriceChange {
  pair: string;
  latestPrice: string;
  day: string;
  week: string;
  month: string;
  year: string;
}

export interface PriceChangeResponse {
  code: string;
  message: string;
  payload: PriceChange[];
}

const TradeService = {
  listPriceChanges: createService<PriceChangeResponse>({
    url: 'trade/price-changes',
    method: 'get',
  }),
};

export default TradeService;
