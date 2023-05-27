import nock from 'nock';
import { render, screen, waitFor } from '@testing-library/react';
import ClientProvider from '@pintu/technical-test/app/client-provider';
import PriceTable from '@pintu/technical-test/app/component/price-table';
import WalletService from '@pintu/technical-test/service/wallet-service';
import TradeService from '@pintu/technical-test/service/trade-service';

jest.mock('@pintu/technical-test/service/wallet-service');
jest.mock('@pintu/technical-test/service/trade-service');

const listSupportedCurrencies =
  WalletService.listSupportedCurrencies as jest.MockedFunction<
    typeof WalletService.listSupportedCurrencies
  >;

const listPriceChanges = TradeService.listPriceChanges as jest.MockedFunction<
  typeof TradeService.listPriceChanges
>;

describe('PriceTable', () => {
  beforeEach(() => {
    listSupportedCurrencies.mockResolvedValue({
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
    });

    listPriceChanges
      .mockResolvedValueOnce({
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
      })
      .mockResolvedValueOnce({
        code: 'success',
        message: '',
        payload: [
          {
            pair: 'btc/idr',
            latestPrice: '397412558',
            day: '0.99',
            week: '-0.95',
            month: '-3.71',
            year: '-8.33',
          },
          {
            pair: 'eth/idr',
            latestPrice: '27335136',
            day: '1.67',
            week: '0.85',
            month: '-0.68',
            year: '-4.11',
          },
        ],
      });

    nock('http://localhost')
      .get(
        '/api/svg?url=https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_BTC.svg',
      )
      .reply(200, '<svg xmlns="http://www.w3.org/2000/svg"></svg>', {
        'Content-Type': 'image/svg+xml',
      });

    nock('http://localhost')
      .get(
        '/api/svg?url=https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_ETH.svg',
      )
      .reply(200, '<svg xmlns="http://www.w3.org/2000/svg"></svg>', {
        'Content-Type': 'image/svg+xml',
      });
  });

  it('should load component', () => {
    render(
      <ClientProvider>
        <PriceTable />
      </ClientProvider>,
    );

    expect(screen.getByRole('img')).toHaveClass('animate-spin');
  });

  it('should call supported currencies and price changes api', () => {
    render(
      <ClientProvider>
        <PriceTable />
      </ClientProvider>,
    );

    expect(listSupportedCurrencies).toBeCalled();
    expect(listPriceChanges).toBeCalled();
  });

  it('should render price changes table', async () => {
    const { container } = render(
      <ClientProvider>
        <PriceTable />
      </ClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('CRYPTO')).toBeInTheDocument();
      expect(screen.getByText('HARGA')).toBeInTheDocument();
      expect(screen.getByText('24 JAM')).toBeInTheDocument();
      expect(screen.getByText('1 MGG')).toBeInTheDocument();
      expect(screen.getByText('1 BLN')).toBeInTheDocument();
      expect(screen.getByText('1 THN')).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[0]).toHaveAttribute(
        'data-src',
        'api/svg?url=https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_BTC.svg',
      );
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
      expect(screen.getByText('BTC')).toBeInTheDocument();
      expect(screen.getByText('Rp 395.954.932')).toBeInTheDocument();
      expect(screen.getByText('0.83%')).toBeInTheDocument();
      expect(screen.getByText('1.28%')).toBeInTheDocument();
      expect(screen.getByText('4.22%')).toBeInTheDocument();
      expect(screen.getByText('8.67%')).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[1]).toHaveAttribute(
        'data-src',
        'api/svg?url=https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_ETH.svg',
      );
      expect(screen.getByText('Ethereum')).toBeInTheDocument();
      expect(screen.getByText('ETH')).toBeInTheDocument();
      expect(screen.getByText('Rp 27.124.120')).toBeInTheDocument();
      expect(screen.getByText('1.55%')).toBeInTheDocument();
      expect(screen.getByText('0.48%')).toBeInTheDocument();
      expect(screen.getByText('1.68%')).toBeInTheDocument();
      expect(screen.getByText('4.85%')).toBeInTheDocument();
    });
  });

  it('should render price changes table with auto refetch', async () => {
    const { container } = render(
      <ClientProvider>
        <PriceTable />
      </ClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('CRYPTO')).toBeInTheDocument();
      expect(screen.getByText('HARGA')).toBeInTheDocument();
      expect(screen.getByText('24 JAM')).toBeInTheDocument();
      expect(screen.getByText('1 MGG')).toBeInTheDocument();
      expect(screen.getByText('1 BLN')).toBeInTheDocument();
      expect(screen.getByText('1 THN')).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[0]).toHaveAttribute(
        'data-src',
        'api/svg?url=https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_BTC.svg',
      );
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
      expect(screen.getByText('BTC')).toBeInTheDocument();
      expect(screen.getByText('Rp 395.954.932')).toBeInTheDocument();
      expect(screen.getByText('0.83%')).toBeInTheDocument();
      expect(screen.getByText('1.28%')).toBeInTheDocument();
      expect(screen.getByText('4.22%')).toBeInTheDocument();
      expect(screen.getByText('8.67%')).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[1]).toHaveAttribute(
        'data-src',
        'api/svg?url=https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_ETH.svg',
      );
      expect(screen.getByText('Ethereum')).toBeInTheDocument();
      expect(screen.getByText('ETH')).toBeInTheDocument();
      expect(screen.getByText('Rp 27.124.120')).toBeInTheDocument();
      expect(screen.getByText('1.55%')).toBeInTheDocument();
      expect(screen.getByText('0.48%')).toBeInTheDocument();
      expect(screen.getByText('1.68%')).toBeInTheDocument();
      expect(screen.getByText('4.85%')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Rp 397.412.558')).toBeInTheDocument();
      expect(screen.getByText('0.99%')).toBeInTheDocument();
      expect(screen.getByText('0.95%')).toBeInTheDocument();
      expect(screen.getByText('3.71%')).toBeInTheDocument();
      expect(screen.getByText('8.33%')).toBeInTheDocument();

      expect(screen.getByText('Rp 27.335.136')).toBeInTheDocument();
      expect(screen.getByText('1.67%')).toBeInTheDocument();
      expect(screen.getByText('0.85%')).toBeInTheDocument();
      expect(screen.getByText('0.68%')).toBeInTheDocument();
      expect(screen.getByText('4.11%')).toBeInTheDocument();
    });
  });

  it('should render price changes table based on currencies passed to the props', async () => {
    const { container } = render(
      <ClientProvider>
        <PriceTable currencies={['ETH']} />
      </ClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('CRYPTO')).toBeInTheDocument();
      expect(screen.getByText('HARGA')).toBeInTheDocument();
      expect(screen.getByText('24 JAM')).toBeInTheDocument();
      expect(screen.getByText('1 MGG')).toBeInTheDocument();
      expect(screen.getByText('1 BLN')).toBeInTheDocument();
      expect(screen.getByText('1 THN')).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[0]).toHaveAttribute(
        'data-src',
        'api/svg?url=https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_ETH.svg',
      );
      expect(screen.getByText('Ethereum')).toBeInTheDocument();
      expect(screen.getByText('ETH')).toBeInTheDocument();
      expect(screen.getByText('Rp 27.124.120')).toBeInTheDocument();
      expect(screen.getByText('1.55%')).toBeInTheDocument();
      expect(screen.getByText('0.48%')).toBeInTheDocument();
      expect(screen.getByText('1.68%')).toBeInTheDocument();
      expect(screen.getByText('4.85%')).toBeInTheDocument();
    });
  });
});
