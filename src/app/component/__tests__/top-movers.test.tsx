import nock from 'nock';
import { render, screen, waitFor } from '@testing-library/react';
import ClientProvider from '@pintu/technical-test/app/client-provider';
import TopMovers from '@pintu/technical-test/app/component/top-movers';
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

describe('TopMovers', () => {
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
          wallets: [],
        },
        {
          currencyGroup: 'ETH',
          color: '#9011FE',
          currencySymbol: 'ETH',
          name: 'Ethereum',
          logo: 'http://localhost/static.pintu.co.id/assets/images/logo/circle_ETH.svg',
          decimal_point: 18,
          listingDate: '2020-09-15T09:43:46Z',
          wallets: [],
        },
        {
          currencyGroup: 'USDT',
          color: '#15A57C',
          currencySymbol: 'USDT',
          name: 'Tether',
          logo: 'http://localhost/static.pintu.co.id/assets/images/logo/circle_USDT.svg',
          decimal_point: 6,
          listingDate: '2020-09-15T09:43:47Z',
          wallets: [],
        },
        {
          currencyGroup: 'BNB',
          color: '#FEBF11',
          currencySymbol: 'BNB',
          name: 'Binance Coin',
          logo: 'http://localhost/static.pintu.co.id/assets/images/logo/circle_BNB.svg',
          decimal_point: 8,
          listingDate: '2020-09-15T09:43:48Z',
          wallets: [],
        },
        {
          currencyGroup: 'COMP',
          color: '#00D395',
          currencySymbol: 'COMP',
          name: 'Compound',
          logo: 'http://localhost/static.pintu.co.id/assets/images/logo/circle_COMP.svg',
          decimal_point: 18,
          listingDate: '2020-09-24T15:17:38Z',
          wallets: [],
        },
        {
          currencyGroup: 'LINK',
          color: '#5664F5',
          currencySymbol: 'LINK',
          name: 'Chainlink',
          logo: 'http://localhost/static.pintu.co.id/assets/images/logo/circle_LINK.svg',
          decimal_point: 18,
          listingDate: '2020-09-24T15:17:39Z',
          wallets: [],
        },
        {
          currencyGroup: 'SNX',
          color: '#0CD0FE',
          currencySymbol: 'SNX',
          name: 'Synthetix',
          logo: 'http://localhost/static.pintu.co.id/assets/images/logo/circle_SNX.svg',
          decimal_point: 18,
          listingDate: '2020-09-24T15:17:40Z',
          wallets: [],
        },
        {
          currencyGroup: 'YFI',
          color: '#006AE3',
          currencySymbol: 'YFI',
          name: 'Yearn.finance',
          logo: 'http://localhost/static.pintu.co.id/assets/images/logo/circle_YFI.svg',
          decimal_point: 18,
          listingDate: '2020-10-14T17:16:24Z',
          wallets: [],
        },
        {
          currencyGroup: 'UNI',
          color: '#FF007A',
          currencySymbol: 'UNI',
          name: 'Uniswap',
          logo: 'http://localhost/static.pintu.co.id/assets/images/logo/circle_UNI.svg',
          decimal_point: 18,
          listingDate: '2020-10-14T17:16:55Z',
          wallets: [],
        },
      ],
    });

    listPriceChanges.mockResolvedValueOnce({
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
        {
          pair: 'usdt/idr',
          latestPrice: '14962',
          day: '0.00',
          week: '0.10',
          month: '1.40',
          year: '2.30',
        },
        {
          pair: 'bnb/idr',
          latestPrice: '4722872',
          day: '2.40',
          week: '3.36',
          month: '-2.10',
          year: '4.76',
        },
        {
          pair: 'comp/idr',
          latestPrice: '544682',
          day: '3.60',
          week: '5.98',
          month: '-8.86',
          year: '-34.71',
        },
        {
          pair: 'link/idr',
          latestPrice: '99177',
          day: '1.64',
          week: '2.61',
          month: '-5.46',
          year: '2.81',
        },
        {
          pair: 'snx/idr',
          latestPrice: '36923',
          day: '1.23',
          week: '5.60',
          month: '2.34',
          year: '1.43',
        },
        {
          pair: 'yfi/idr',
          latestPrice: '99849685',
          day: '1.59',
          week: '1.51',
          month: '-17.88',
          year: '-10.85',
        },
        {
          pair: 'uni/idr',
          latestPrice: '76956',
          day: '1.39',
          week: '0.84',
          month: '-5.57',
          year: '5.40',
        },
      ],
    });

    nock('http://localhost')
      .get('/static.pintu.co.id/assets/images/logo/circle_COMP.svg')
      .reply(200, '<svg xmlns="http://www.w3.org/2000/svg"></svg>', {
        'Content-Type': 'image/svg+xml',
      });

    nock('http://localhost')
      .get('/static.pintu.co.id/assets/images/logo/circle_BNB.svg')
      .reply(200, '<svg xmlns="http://www.w3.org/2000/svg"></svg>', {
        'Content-Type': 'image/svg+xml',
      });

    nock('http://localhost')
      .get('/static.pintu.co.id/assets/images/logo/circle_LINK.svg')
      .reply(200, '<svg xmlns="http://www.w3.org/2000/svg"></svg>', {
        'Content-Type': 'image/svg+xml',
      });

    nock('http://localhost')
      .get('/static.pintu.co.id/assets/images/logo/circle_YFI.svg')
      .reply(200, '<svg xmlns="http://www.w3.org/2000/svg"></svg>', {
        'Content-Type': 'image/svg+xml',
      });

    nock('http://localhost')
      .get('/static.pintu.co.id/assets/images/logo/circle_ETH.svg')
      .reply(200, '<svg xmlns="http://www.w3.org/2000/svg"></svg>', {
        'Content-Type': 'image/svg+xml',
      });

    nock('http://localhost')
      .get('/static.pintu.co.id/assets/images/logo/circle_UNI.svg')
      .reply(200, '<svg xmlns="http://www.w3.org/2000/svg"></svg>', {
        'Content-Type': 'image/svg+xml',
      });
  });

  it('should render 6 top movers', async () => {
    const { container } = render(
      <ClientProvider>
        <TopMovers />
      </ClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('🔥 Top Movers (24 Jam)'));

      expect(container.querySelectorAll('.injected-svg')[0]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_COMP.svg',
      );
      expect(screen.getByText('Compound')).toBeInTheDocument();
      expect(screen.getByText('Rp 544.682')).toBeInTheDocument();
      expect(screen.getByText('3.60%')).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[1]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_BNB.svg',
      );
      expect(screen.getByText('Binance Coin')).toBeInTheDocument();
      expect(screen.getByText('Rp 4.722.872')).toBeInTheDocument();
      expect(screen.getByText('2.40%')).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[2]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_LINK.svg',
      );
      expect(screen.getByText('Chainlink')).toBeInTheDocument();
      expect(screen.getByText('Rp 99.177')).toBeInTheDocument();
      expect(screen.getByText('1.64%')).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[3]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_YFI.svg',
      );
      expect(screen.getByText('Yearn.finance')).toBeInTheDocument();
      expect(screen.getByText('Rp 99.849.685')).toBeInTheDocument();
      expect(screen.getByText('1.59%')).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[4]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_ETH.svg',
      );
      expect(screen.getByText('Ethereum')).toBeInTheDocument();
      expect(screen.getByText('Rp 27.124.120')).toBeInTheDocument();
      expect(screen.getByText('1.55%')).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[5]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_UNI.svg',
      );
      expect(screen.getByText('Uniswap')).toBeInTheDocument();
      expect(screen.getByText('Rp 76.956')).toBeInTheDocument();
      expect(screen.getByText('1.39%')).toBeInTheDocument();
    });
  });
});
