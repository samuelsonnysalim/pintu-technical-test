import { createService } from './core';

interface Wallet {
  currencyGroup: string;
  tokenSymbol: string;
  decimal_point: number;
  tokenType: string;
  blockchain: string;
  explorer: string;
  listingDate: string;
  blockchainName: string;
  logo: string;
}

interface SupportedCurrency {
  currencyGroup: string;
  color: string;
  currencySymbol: string;
  name: string;
  logo: string;
  decimal_point: number;
  listingDate: string;
  wallets: Wallet[];
}

export interface SupportedCurrenciesResponse {
  code: string;
  message: string;
  payload: SupportedCurrency[];
}

const WalletService = {
  listSupportedCurrencies: createService<SupportedCurrenciesResponse>({
    url: 'wallet/supportedCurrencies',
    method: 'get',
  }),
};

export default WalletService;
