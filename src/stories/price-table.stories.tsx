import type { Meta, StoryObj } from '@storybook/react';
import ClientProvider from '@pintu/technical-test/app/client-provider';
import PriceTable from '@pintu/technical-test/app/component/price-table';

const meta: Meta<typeof PriceTable> = {
  title: 'Component/PriceTable',
  component: PriceTable,
  tags: ['autodocs'],
  decorators: [
    (PriceTable) => (
      <ClientProvider>
        <PriceTable />
      </ClientProvider>
    ),
  ],
  parameters: {
    mockData: [
      {
        url: `${process.env.NEXT_PUBLIC_HOSTNAME}api/wallet/supportedCurrencies`,
        method: 'GET',
        status: 200,
        response: {
          code: 'success',
          message: '',
          payload: [
            {
              currencyGroup: 'IDR',
              color: '#0A68F4',
              currencySymbol: 'Rp',
              name: 'Rupiah Token',
              logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_IDRT.svg',
              decimal_point: 0,
              listingDate: '2020-09-15T09:43:42Z',
              wallets: [],
            },
            {
              currencyGroup: 'BTC',
              color: '#F78B1A',
              currencySymbol: 'BTC',
              name: 'Bitcoin',
              logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_BTC.svg',
              decimal_point: 8,
              listingDate: '2020-09-15T09:43:45Z',
              wallets: [
                {
                  currencyGroup: 'BTC',
                  tokenSymbol: 'BTC',
                  decimal_point: 8,
                  tokenType: 'Bitcoin',
                  blockchain: 'Bitcoin',
                  explorer: 'https://explorer.bitcoin.com/btc/tx/',
                  listingDate: '2020-09-15T09:43:45Z',
                  blockchainName: 'Bitcoin',
                  logo: 'https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/Bitcoin.svg',
                },
              ],
            },
            {
              currencyGroup: 'ETH',
              color: '#9011FE',
              currencySymbol: 'ETH',
              name: 'Ethereum',
              logo: 'https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_ETH.svg',
              decimal_point: 18,
              listingDate: '2020-09-15T09:43:46Z',
              wallets: [
                {
                  currencyGroup: 'ETH',
                  tokenSymbol: 'ETH',
                  decimal_point: 18,
                  tokenType: 'ERC-20',
                  blockchain: 'Ethereum',
                  explorer: 'https://etherscan.io/tx/',
                  listingDate: '2020-09-15T09:43:46Z',
                  blockchainName: 'Ethereum',
                  logo: 'https://s3.ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/blockchain/ERC-20.svg',
                },
              ],
            },
          ],
        },
      },
      {
        url: `${process.env.NEXT_PUBLIC_HOSTNAME}api/trade/price-changes`,
        method: 'GET',
        status: 200,
        response: {
          code: 'success',
          message: '',
          payload: [
            {
              pair: 'btc/idr',
              latestPrice: '395954932',
              day: '0.83',
              week: '-1.28',
              month: '-4.22',
              year: '-8.67',
            },
            {
              pair: 'eth/idr',
              latestPrice: '27124120',
              day: '1.55',
              week: '0.48',
              month: '-1.68',
              year: '-4.85',
            },
          ],
        },
      },
    ],
  },
  argTypes: {
    currencies: {
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PriceTable>;

export const Default: Story = {};

export const FilteredByCurrencies: Story = {
  args: {
    currencies: ['ETH'],
  },
};
