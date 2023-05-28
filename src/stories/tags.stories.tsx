import type { Meta, StoryObj } from '@storybook/react';
import RootLayout from '@pintu/technical-test/app/layout';
import Tags from '@pintu/technical-test/app/tags/[slug]/page';
import {
  ReactElement,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from 'react';

function AwaitedTags() {
  const [TagsComponent, setTagsComponent] = useState<ReactElement>();

  const load = useCallback(async () => {
    setTagsComponent(await Tags({ params: { slug: 'new' } }));
  }, []);

  useEffect(() => {
    load();
  }, []);

  return (
    <RootLayout>
      <Suspense>{TagsComponent}</Suspense>
    </RootLayout>
  );
}

const meta: Meta<typeof Tags> = {
  title: 'Page/Tags',
  component: AwaitedTags,
  parameters: {
    doc: {
      source: {
        type: 'code',
      },
    },
    mockData: [
      {
        url: `${process.env.NEXT_PUBLIC_HOSTNAME}api/market-tags?language.name=ID&slug_eq=new`,
        method: 'GET',
        status: 200,
        response: [
          {
            id: 55,
            title: 'Terbaru',
            subtitle: 'Listing aset crypto terbaru di Pintu.',
            language: {
              id: 1,
              name: 'ID',
              created_at: '2020-03-02T12:31:09.876Z',
              updated_at: '2020-03-02T12:31:09.876Z',
            },
            url: null,
            published_at: '2021-10-05T06:03:11.242Z',
            created_at: '2021-10-05T06:03:08.020Z',
            updated_at: '2023-03-24T03:30:06.239Z',
            statusbar: 'light',
            order: 1,
            slug: 'new',
            meta_title: 'List Coin Crypto Terbaru | Pintu',
            meta_description:
              'Dapatkan informasi terupdate harga Coin Crypto terbaru dalam Rupiah hari ini secara real-time di Pintu',
            icon: {
              id: 550,
              name: 'Latest.svg',
              hash: 'Latest_b83e6c1ad1',
              sha256: null,
              ext: '.svg',
              mime: 'image/svg+xml',
              size: 3.04,
              url: 'https://s3.ap-southeast-1.amazonaws.com/content.pintu.co.id/Latest_b83e6c1ad1.svg',
              provider: 'aws-s3',
              provider_metadata: null,
              created_at: '2022-05-31T06:19:18.173Z',
              updated_at: '2022-05-31T06:19:18.184Z',
              alternativeText: '',
              caption: '',
              width: 24,
              height: 24,
              formats: null,
              previewUrl: null,
            },
            image: {
              id: 528,
              name: 'Market-Latest.png',
              hash: 'Market_Latest_f9dab5a33a',
              sha256: null,
              ext: '.png',
              mime: 'image/png',
              size: 11.41,
              url: 'https://s3.ap-southeast-1.amazonaws.com/content.pintu.co.id/Market_Latest_f9dab5a33a.png',
              provider: 'aws-s3',
              provider_metadata: null,
              created_at: '2022-05-20T04:17:12.249Z',
              updated_at: '2022-05-20T04:17:12.257Z',
              alternativeText: '',
              caption: '',
              width: 750,
              height: 270,
              formats: {
                small: {
                  ext: '.png',
                  url: 'https://s3.ap-southeast-1.amazonaws.com/content.pintu.co.id/small_Market_Latest_f9dab5a33a.png',
                  hash: 'small_Market_Latest_f9dab5a33a',
                  mime: 'image/png',
                  name: 'small_Market-Latest.png',
                  path: null,
                  size: 15.81,
                  width: 500,
                  height: 180,
                },
                thumbnail: {
                  ext: '.png',
                  url: 'https://s3.ap-southeast-1.amazonaws.com/content.pintu.co.id/thumbnail_Market_Latest_f9dab5a33a.png',
                  hash: 'thumbnail_Market_Latest_f9dab5a33a',
                  mime: 'image/png',
                  name: 'thumbnail_Market-Latest.png',
                  path: null,
                  size: 5.9,
                  width: 245,
                  height: 88,
                },
              },
              previewUrl: null,
            },
            currencies: [
              {
                id: 123,
                name: 'ETH',
                created_at: '2023-03-24T02:50:51.906Z',
                updated_at: '2023-03-24T02:50:51.911Z',
              },
            ],
          },
        ],
      },
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
};

export default meta;

type Story = StoryObj<typeof Tags>;

export const Default: Story = {};
