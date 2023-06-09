import nock from 'nock';
import { render, screen, waitFor } from '@testing-library/react';
import ClientProvider from '@pintu/technical-test/app/client-provider';
import MarketTags from '@pintu/technical-test/app/component/market-tags';
import MarketTagService from '@pintu/technical-test/service/market-tag-service';

jest.mock('@pintu/technical-test/service/market-tag-service');

const listMarketTags = MarketTagService.listMarketTags as jest.MockedFunction<
  typeof MarketTagService.listMarketTags
>;

describe('MarketTags', () => {
  beforeEach(() => {
    listMarketTags.mockResolvedValue([
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
          url: 'http://localhost/content.pintu.co.id/Latest_b83e6c1ad1.svg',
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
          url: 'http://localhost/content.pintu.co.id/Market_Latest_f9dab5a33a.png',
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
              url: 'http://localhost/content.pintu.co.id/small_Market_Latest_f9dab5a33a.png',
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
              url: 'http://localhost/content.pintu.co.id/thumbnail_Market_Latest_f9dab5a33a.png',
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
            id: 216,
            name: 'ID',
            created_at: '2023-03-24T02:50:51.906Z',
            updated_at: '2023-03-24T02:50:51.911Z',
          },
          {
            id: 214,
            name: 'STX',
            created_at: '2023-03-21T06:29:14.494Z',
            updated_at: '2023-03-21T06:29:14.501Z',
          },
          {
            id: 215,
            name: 'ARB',
            created_at: '2023-03-21T06:29:19.191Z',
            updated_at: '2023-03-21T06:29:19.197Z',
          },
        ],
      },
      {
        id: 10,
        title: 'DeFi',
        subtitle:
          'Ekosistem aplikasi keuangan terdesentralisasi yang memungkinkan penggunanya untuk melakukan berbagai transaksi keuangan seperti pinjam meminjam dan jual beli aset kripto.',
        language: {
          id: 1,
          name: 'ID',
          created_at: '2020-03-02T12:31:09.876Z',
          updated_at: '2020-03-02T12:31:09.876Z',
        },
        url: null,
        published_at: '2021-09-07T04:01:15.039Z',
        created_at: '2021-09-07T04:00:55.471Z',
        updated_at: '2023-02-22T09:44:29.348Z',
        statusbar: 'light',
        order: 2,
        slug: 'defi',
        meta_title: 'List DeFi Coin Terbaru | Pintu',
        meta_description:
          'Dapatkan informasi terupdate harga DeFi Coin dalam Rupiah hari ini secara real-time di Pintu',
        icon: {
          id: 533,
          name: 'DeFi.svg',
          hash: 'De_Fi_c2cbe56025',
          sha256: null,
          ext: '.svg',
          mime: 'image/svg+xml',
          size: 1.39,
          url: 'http://localhost/content.pintu.co.id/De_Fi_c2cbe56025.svg',
          provider: 'aws-s3',
          provider_metadata: null,
          created_at: '2022-05-31T06:07:53.447Z',
          updated_at: '2022-05-31T06:07:53.457Z',
          alternativeText: '',
          caption: '',
          width: 24,
          height: 24,
          formats: null,
          previewUrl: null,
        },
        image: {
          id: 498,
          name: 'Market - DeFi.png',
          hash: 'Market_De_Fi_491b73e09f',
          sha256: null,
          ext: '.png',
          mime: 'image/png',
          size: 12.98,
          url: 'http://localhost/content.pintu.co.id/Market_De_Fi_491b73e09f.png',
          provider: 'aws-s3',
          provider_metadata: null,
          created_at: '2022-04-13T09:49:47.037Z',
          updated_at: '2022-04-13T09:49:47.046Z',
          alternativeText: '',
          caption: '',
          width: 750,
          height: 272,
          formats: {
            small: {
              ext: '.png',
              url: 'http://localhost/content.pintu.co.id/small_Market_De_Fi_491b73e09f.png',
              hash: 'small_Market_De_Fi_491b73e09f',
              mime: 'image/png',
              name: 'small_Market - DeFi.png',
              path: null,
              size: 18.71,
              width: 500,
              height: 181,
            },
            thumbnail: {
              ext: '.png',
              url: 'http://localhost/content.pintu.co.id/thumbnail_Market_De_Fi_491b73e09f.png',
              hash: 'thumbnail_Market_De_Fi_491b73e09f',
              mime: 'image/png',
              name: 'thumbnail_Market - DeFi.png',
              path: null,
              size: 7.33,
              width: 245,
              height: 89,
            },
          },
          previewUrl: null,
        },
        currencies: [
          {
            id: 100,
            name: 'DYDX',
            created_at: '2022-04-28T09:34:11.130Z',
            updated_at: '2022-04-28T09:34:11.146Z',
          },
          {
            id: 178,
            name: 'ZRX',
            created_at: '2022-10-25T16:25:00.363Z',
            updated_at: '2022-10-25T16:25:00.367Z',
          },
          {
            id: 164,
            name: 'NMR',
            created_at: '2022-10-25T16:23:46.472Z',
            updated_at: '2022-10-25T16:23:46.477Z',
          },
        ],
      },
    ]);

    nock('http://localhost')
      .get('/content.pintu.co.id/Latest_b83e6c1ad1.svg')
      .reply(200, '<svg xmlns="http://www.w3.org/2000/svg"></svg>', {
        'Content-Type': 'image/svg+xml',
      });

    nock('http://localhost')
      .get('/content.pintu.co.id/De_Fi_c2cbe56025.svg')
      .reply(200, '<svg xmlns="http://www.w3.org/2000/svg"></svg>', {
        'Content-Type': 'image/svg+xml',
      });
  });

  it('should call market tags api', () => {
    render(
      <ClientProvider>
        <MarketTags />
      </ClientProvider>,
    );

    expect(listMarketTags).toBeCalledWith({
      query: {
        'language.name': 'ID',
        _sort: 'order:ASC',
      },
    });
  });

  it('should render market tags with link', async () => {
    const { container } = render(
      <ClientProvider>
        <MarketTags />
      </ClientProvider>,
    );

    await waitFor(() => {
      expect(container.querySelectorAll('.injected-svg')[0]).toHaveAttribute(
        'data-src',
        'http://localhost/content.pintu.co.id/Latest_b83e6c1ad1.svg',
      );
      expect(screen.getByText('Terbaru')).toHaveAttribute('href', 'tags/new');

      expect(container.querySelectorAll('.injected-svg')[1]).toHaveAttribute(
        'data-src',
        'http://localhost/content.pintu.co.id/De_Fi_c2cbe56025.svg',
      );
      expect(screen.getByText('DeFi')).toHaveAttribute('href', 'tags/defi');
    });
  });
});
