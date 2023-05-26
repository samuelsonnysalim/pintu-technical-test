import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchCurrency from '@pintu/technical-test/app/component/search-currency';
import ClientProvider from '@pintu/technical-test/app/client-provider';
import WalletService from '@pintu/technical-test/service/wallet-service';

jest.mock('@pintu/technical-test/service/wallet-service', () => ({
  listSupportedCurrencies: jest.fn().mockResolvedValue({
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
  }),
}));

const listSupportedCurrencies =
  WalletService.listSupportedCurrencies as jest.Mocked<
    typeof WalletService.listSupportedCurrencies
  >;

describe('SearchCurrency', () => {
  it('should load component', () => {
    render(
      <ClientProvider>
        <SearchCurrency />
      </ClientProvider>,
    );

    expect(screen.getByText('Cari aset di Pintu...')).toBeInTheDocument();
  });

  it('should open search input panel, focus on search input, and supported currencies on click', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <ClientProvider>
        <SearchCurrency />
      </ClientProvider>,
    );

    await user.click(screen.getByText('Cari aset di Pintu...'));
    expect(screen.queryByText('Cari aset di Pintu...')).not.toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Cari aset di Pintu...'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cari aset di Pintu...')).toHaveFocus();
  });

  it('should close search input panel on clicking close button', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <ClientProvider>
        <SearchCurrency />
      </ClientProvider>,
    );

    await user.click(screen.getByText('Cari aset di Pintu...'));
    expect(screen.queryByText('Cari aset di Pintu...')).not.toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Cari aset di Pintu...'),
    ).toBeInTheDocument();

    await user.click(screen.getByTitle('Close'));
    expect(screen.getByText('Cari aset di Pintu...')).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('Cari aset di Pintu...'),
    ).not.toBeInTheDocument();
  });

  it('should call supported currencies api', () => {
    render(
      <ClientProvider>
        <SearchCurrency />
      </ClientProvider>,
    );

    expect(listSupportedCurrencies).toBeCalled();
  });

  it('should load supported currencies based on api', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <ClientProvider>
        <SearchCurrency />
      </ClientProvider>,
    );

    await user.click(screen.getByText('Cari aset di Pintu...'));

    await waitFor(() => {
      expect(screen.getByAltText('Rupiah Token Logo')).toBeInTheDocument();
      expect(screen.getByText('Rupiah Token')).toBeInTheDocument();
      expect(screen.getByText('Rp')).toBeInTheDocument();

      expect(screen.getByAltText('Bitcoin Logo')).toBeInTheDocument();
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
      expect(screen.getByText('BTC')).toBeInTheDocument();

      expect(screen.getByAltText('Ethereum Logo')).toBeInTheDocument();
      expect(screen.getByText('Ethereum')).toBeInTheDocument();
      expect(screen.getByText('ETH')).toBeInTheDocument();
    });
  });

  it('should filter supported currencies based on search input', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <ClientProvider>
        <SearchCurrency />
      </ClientProvider>,
    );

    await user.click(screen.getByText('Cari aset di Pintu...'));
    await user.type(
      screen.getByPlaceholderText('Cari aset di Pintu...'),
      'bit',
    );

    await waitFor(() => {
      expect(
        screen.queryByAltText('Rupiah Token Logo'),
      ).not.toBeInTheDocument();
      expect(screen.queryByText('Rupiah Token')).not.toBeInTheDocument();
      expect(screen.queryByText('Rp')).not.toBeInTheDocument();

      expect(screen.getByAltText('Bitcoin Logo')).toBeInTheDocument();
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
      expect(screen.getByText('BTC')).toBeInTheDocument();

      expect(screen.queryByAltText('Ethereum Logo')).not.toBeInTheDocument();
      expect(screen.queryByText('Ethereum')).not.toBeInTheDocument();
      expect(screen.queryByText('ETH')).not.toBeInTheDocument();
    });
  });

  it("should not found panel if the searched item doesn't exist", async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <ClientProvider>
        <SearchCurrency />
      </ClientProvider>,
    );

    await user.click(screen.getByText('Cari aset di Pintu...'));
    await user.type(
      screen.getByPlaceholderText('Cari aset di Pintu...'),
      'asdf',
    );

    await waitFor(() => {
      expect(screen.getByText('"asdf" Tidak Ditemukan')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Kata kunci tidak sesuai atau aset belum ada di Pintu',
        ),
      ).toBeInTheDocument();
    });
  });
});
