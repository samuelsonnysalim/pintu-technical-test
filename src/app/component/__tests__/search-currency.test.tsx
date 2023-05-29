import nock from 'nock';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ClientProvider from '@pintu/technical-test/app/client-provider';
import SearchCurrency from '@pintu/technical-test/app/component/search-currency';
import WalletService from '@pintu/technical-test/service/wallet-service';
import { resizeScreenSize } from '@pintu/technical-test/jest/util';

jest.mock('@pintu/technical-test/service/wallet-service');

const listSupportedCurrencies =
  WalletService.listSupportedCurrencies as jest.MockedFunction<
    typeof WalletService.listSupportedCurrencies
  >;

describe('SearchCurrency', () => {
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
    expect(
      screen.getByPlaceholderText('Cari aset di Pintu...'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cari aset di Pintu...')).toHaveFocus();
  });

  it('should open search input panel, focus on search input, and supported currencies on click on mobile layout', async () => {
    const user = userEvent.setup({ delay: null });
    resizeScreenSize(400);
    render(
      <ClientProvider>
        <SearchCurrency />
      </ClientProvider>,
    );

    await user.click(screen.getByTitle('Show Search Currency'));
    expect(
      screen.getByPlaceholderText('Cari aset di Pintu...'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cari aset di Pintu...')).toHaveFocus();
  });

  it('should disable scroll on body while opening search currency on mobile layout', async () => {
    const user = userEvent.setup({ delay: null });
    resizeScreenSize(400);
    render(
      <ClientProvider>
        <SearchCurrency />
      </ClientProvider>,
    );

    await user.click(screen.getByTitle('Show Search Currency'));

    expect(document.body).toHaveClass('overflow-hidden');
  });

  it('should close search input panel on clicking close button', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <ClientProvider>
        <SearchCurrency />
      </ClientProvider>,
    );

    await user.click(screen.getByText('Cari aset di Pintu...'));
    await user.click(screen.getByTitle('Close'));
    expect(
      screen.queryByPlaceholderText('Cari aset di Pintu...'),
    ).not.toBeInTheDocument();
  });

  it('should close search input panel on clicking outside the component', async () => {
    const user = userEvent.setup({ delay: null });
    render(
      <ClientProvider>
        <div>Outside</div>
        <SearchCurrency />
      </ClientProvider>,
    );

    await user.click(screen.getByText('Cari aset di Pintu...'));
    await user.click(screen.getByText('Outside'));
    expect(
      screen.queryByPlaceholderText('Cari aset di Pintu...'),
    ).not.toBeInTheDocument();
  });

  it('should clear search input value on reopen', async () => {
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
    await user.click(screen.getByTitle('Close'));
    await user.click(screen.getByText('Cari aset di Pintu...'));
    expect(screen.queryByPlaceholderText('Cari aset di Pintu...')).toHaveValue(
      '',
    );
  });

  it('should enable scroll on body while closing search currency on mobile layout', async () => {
    const user = userEvent.setup();
    resizeScreenSize(400);
    render(
      <ClientProvider>
        <SearchCurrency />
      </ClientProvider>,
    );

    await user.click(screen.getByTitle('Show Search Currency'));
    await waitFor(() => user.click(screen.getByTitle('Close')));

    expect(document.body).not.toHaveClass('overflow-hidden');
  });

  it('should call supported currencies api', () => {
    render(
      <ClientProvider>
        <SearchCurrency />
      </ClientProvider>,
    );

    expect(listSupportedCurrencies).toBeCalled();
  });

  it('should render supported currencies based on api', async () => {
    const user = userEvent.setup({ delay: null });
    const { container } = render(
      <ClientProvider>
        <SearchCurrency />
      </ClientProvider>,
    );

    await user.click(screen.getByText('Cari aset di Pintu...'));

    await waitFor(() => {
      expect(container.querySelectorAll('.injected-svg')[0]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_BTC.svg',
      );
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
      expect(screen.getByText('BTC')).toBeInTheDocument();

      expect(container.querySelectorAll('.injected-svg')[1]).toHaveAttribute(
        'data-src',
        'http://localhost/static.pintu.co.id/assets/images/logo/circle_ETH.svg',
      );
      expect(screen.getByText('Ethereum')).toBeInTheDocument();
      expect(screen.getByText('ETH')).toBeInTheDocument();
    });
  });

  it('should filter supported currencies by name based on search input', async () => {
    const user = userEvent.setup({ delay: null });
    const { container } = render(
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
      expect(container.querySelectorAll('.injected-svg')).toHaveLength(1);

      expect(screen.queryByText('Rupiah Token')).not.toBeInTheDocument();
      expect(screen.queryByText('Rp')).not.toBeInTheDocument();

      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
      expect(screen.getByText('BTC')).toBeInTheDocument();

      expect(screen.queryByText('Ethereum')).not.toBeInTheDocument();
      expect(screen.queryByText('ETH')).not.toBeInTheDocument();
    });
  });

  it('should filter supported currencies by currency symbol based on search input', async () => {
    const user = userEvent.setup({ delay: null });
    const { container } = render(
      <ClientProvider>
        <SearchCurrency />
      </ClientProvider>,
    );

    await user.click(screen.getByText('Cari aset di Pintu...'));
    await user.type(
      screen.getByPlaceholderText('Cari aset di Pintu...'),
      'btc',
    );

    await waitFor(() => {
      expect(container.querySelectorAll('.injected-svg')).toHaveLength(1);

      expect(screen.queryByText('Rupiah Token')).not.toBeInTheDocument();
      expect(screen.queryByText('Rp')).not.toBeInTheDocument();

      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
      expect(screen.getByText('BTC')).toBeInTheDocument();

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
