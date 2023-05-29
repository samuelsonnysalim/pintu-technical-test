import nock from 'nock';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ClientProvider from '@pintu/technical-test/app/client-provider';
import PriceTable from '@pintu/technical-test/app/component/price-table';
import WalletService from '@pintu/technical-test/service/wallet-service';
import TradeService from '@pintu/technical-test/service/trade-service';
import { resizeScreenSize } from '@pintu/technical-test/jest/util';

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
          logo: 'http://localhost/static.pintu.co.id/assets/images/logo/circle_IDRT.svg',
          decimal_point: 0,
          listingDate: '2020-09-15T09:43:42Z',
          wallets: [],
        },
        {
          currencyGroup: 'BTC',
          color: '#F78B1A',
          currencySymbol: 'BTC',
          name: 'Bitcoin',
          logo: 'http://localhost/static.pintu.co.id/assets/images/logo/circle_BTC.svg',
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
              logo: 'http://localhost/static.pintu.co.id/assets/images/logo/blockchain/Bitcoin.svg',
            },
          ],
        },
        {
          currencyGroup: 'ETH',
          color: '#9011FE',
          currencySymbol: 'ETH',
          name: 'Ethereum',
          logo: 'http://localhost/static.pintu.co.id/assets/images/logo/circle_ETH.svg',
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
              logo: 'http://localhost/static.pintu.co.id/assets/images/logo/blockchain/ERC-20.svg',
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
      .get('/static.pintu.co.id/assets/images/logo/circle_BTC.svg')
      .reply(200, '<svg xmlns="http://www.w3.org/2000/svg"></svg>', {
        'Content-Type': 'image/svg+xml',
      });

    nock('http://localhost')
      .get('/static.pintu.co.id/assets/images/logo/circle_ETH.svg')
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
      expect(screen.getAllByText('CRYPTO')[1]).toBeInTheDocument();
      expect(screen.getByText('HARGA')).toBeInTheDocument();
      expect(screen.getAllByText('24 JAM')[1]).toBeInTheDocument();
      expect(screen.getAllByText('1 MGG')[1]).toBeInTheDocument();
      expect(screen.getAllByText('1 BLN')[1]).toBeInTheDocument();
      expect(screen.getAllByText('1 THN')[1]).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[2]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_BTC.svg',
      );
      expect(screen.getAllByText('Bitcoin')[1]).toBeInTheDocument();
      expect(screen.getAllByText('BTC')[1]).toBeInTheDocument();
      expect(screen.getAllByText('Rp 395.954.932')[1]).toBeInTheDocument();
      expect(screen.getAllByText('0.83%')[1]).toBeInTheDocument();
      expect(screen.getByText('1.28%')).toBeInTheDocument();
      expect(screen.getByText('4.22%')).toBeInTheDocument();
      expect(screen.getByText('8.67%')).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[3]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_ETH.svg',
      );
      expect(screen.getAllByText('Ethereum')[1]).toBeInTheDocument();
      expect(screen.getAllByText('ETH')[1]).toBeInTheDocument();
      expect(screen.getAllByText('Rp 27.124.120')[1]).toBeInTheDocument();
      expect(screen.getAllByText('1.55%')[1]).toBeInTheDocument();
      expect(screen.getByText('0.48%')).toBeInTheDocument();
      expect(screen.getByText('1.68%')).toBeInTheDocument();
      expect(screen.getByText('4.85%')).toBeInTheDocument();
    });
  });

  it('should render price changes table on mobile layout', async () => {
    resizeScreenSize(400);
    const { container } = render(
      <ClientProvider>
        <PriceTable />
      </ClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByText('CRYPTO')[0]).toBeInTheDocument();
      expect(screen.getByTitle('Select Date Range')).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[0]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_BTC.svg',
      );
      expect(screen.getAllByText('Bitcoin')[0]).toBeInTheDocument();
      expect(screen.getAllByText('BTC')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Rp 395.954.932')[0]).toBeInTheDocument();
      expect(screen.getAllByText('0.83%')[0]).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[1]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_ETH.svg',
      );
      expect(screen.getAllByText('Ethereum')[0]).toBeInTheDocument();
      expect(screen.getAllByText('ETH')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Rp 27.124.120')[0]).toBeInTheDocument();
      expect(screen.getAllByText('1.55%')[0]).toBeInTheDocument();
    });
  });

  it('should be able to select date range to "24 JAM" and render percentage based on it on mobile layout', async () => {
    const user = userEvent.setup({ delay: null });
    resizeScreenSize(400);
    render(
      <ClientProvider>
        <PriceTable />
      </ClientProvider>,
    );

    await user.selectOptions(screen.getByTitle('Select Date Range'), 'day');

    await waitFor(() => {
      expect(screen.getAllByText('0.83%')).toHaveLength(2);
      expect(screen.getAllByText('1.55%')).toHaveLength(2);
    });
  });

  it('should be able to select date range to "1 MGG" and render percentage based on it on mobile layout', async () => {
    const user = userEvent.setup({ delay: null });
    resizeScreenSize(400);
    render(
      <ClientProvider>
        <PriceTable />
      </ClientProvider>,
    );

    await user.selectOptions(screen.getByTitle('Select Date Range'), 'week');

    await waitFor(() => {
      expect(screen.getAllByText('1.28%')).toHaveLength(2);
      expect(screen.getAllByText('0.48%')).toHaveLength(2);
    });
  });

  it('should be able to select date range to "1 BLN" and render percentage based on it on mobile layout', async () => {
    const user = userEvent.setup({ delay: null });
    resizeScreenSize(400);
    render(
      <ClientProvider>
        <PriceTable />
      </ClientProvider>,
    );

    await user.selectOptions(screen.getByTitle('Select Date Range'), 'month');

    await waitFor(() => {
      expect(screen.getAllByText('4.22%')).toHaveLength(2);
      expect(screen.getAllByText('1.68%')).toHaveLength(2);
    });
  });

  it('should be able to select date range to "1 THN" and render percentage based on it on mobile layout', async () => {
    const user = userEvent.setup({ delay: null });
    resizeScreenSize(400);
    render(
      <ClientProvider>
        <PriceTable />
      </ClientProvider>,
    );

    await user.selectOptions(screen.getByTitle('Select Date Range'), 'year');

    await waitFor(() => {
      expect(screen.getAllByText('8.67%')).toHaveLength(2);
      expect(screen.getAllByText('4.85%')).toHaveLength(2);
    });
  });

  it('should render price changes table with auto refetch', async () => {
    const { container } = render(
      <ClientProvider>
        <PriceTable />
      </ClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByText('CRYPTO')[1]).toBeInTheDocument();
      expect(screen.getByText('HARGA')).toBeInTheDocument();
      expect(screen.getAllByText('24 JAM')[1]).toBeInTheDocument();
      expect(screen.getAllByText('1 MGG')[1]).toBeInTheDocument();
      expect(screen.getAllByText('1 BLN')[1]).toBeInTheDocument();
      expect(screen.getAllByText('1 THN')[1]).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[2]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_BTC.svg',
      );
      expect(screen.getAllByText('Bitcoin')[1]).toBeInTheDocument();
      expect(screen.getAllByText('BTC')[1]).toBeInTheDocument();
      expect(screen.getAllByText('Rp 395.954.932')[1]).toBeInTheDocument();
      expect(screen.getAllByText('0.83%')[1]).toBeInTheDocument();
      expect(screen.getByText('1.28%')).toBeInTheDocument();
      expect(screen.getByText('4.22%')).toBeInTheDocument();
      expect(screen.getByText('8.67%')).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[3]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_ETH.svg',
      );
      expect(screen.getAllByText('Ethereum')[1]).toBeInTheDocument();
      expect(screen.getAllByText('ETH')[1]).toBeInTheDocument();
      expect(screen.getAllByText('Rp 27.124.120')[1]).toBeInTheDocument();
      expect(screen.getAllByText('1.55%')[1]).toBeInTheDocument();
      expect(screen.getByText('0.48%')).toBeInTheDocument();
      expect(screen.getByText('1.68%')).toBeInTheDocument();
      expect(screen.getByText('4.85%')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getAllByText('Rp 397.412.558')[1]).toBeInTheDocument();
      expect(screen.getAllByText('0.99%')[1]).toBeInTheDocument();
      expect(screen.getByText('0.95%')).toBeInTheDocument();
      expect(screen.getByText('3.71%')).toBeInTheDocument();
      expect(screen.getByText('8.33%')).toBeInTheDocument();

      expect(screen.getAllByText('Rp 27.335.136')[1]).toBeInTheDocument();
      expect(screen.getAllByText('1.67%')[1]).toBeInTheDocument();
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
      expect(screen.getAllByText('CRYPTO')[1]).toBeInTheDocument();
      expect(screen.getByText('HARGA')).toBeInTheDocument();
      expect(screen.getAllByText('24 JAM')[1]).toBeInTheDocument();
      expect(screen.getAllByText('1 MGG')[1]).toBeInTheDocument();
      expect(screen.getAllByText('1 BLN')[1]).toBeInTheDocument();
      expect(screen.getAllByText('1 THN')[1]).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[1]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_ETH.svg',
      );
      expect(screen.getAllByText('Ethereum')[1]).toBeInTheDocument();
      expect(screen.getAllByText('ETH')[1]).toBeInTheDocument();
      expect(screen.getAllByText('Rp 27.124.120')[1]).toBeInTheDocument();
      expect(screen.getAllByText('1.55%')[1]).toBeInTheDocument();
      expect(screen.getByText('0.48%')).toBeInTheDocument();
      expect(screen.getByText('1.68%')).toBeInTheDocument();
      expect(screen.getByText('4.85%')).toBeInTheDocument();
    });
  });
});
