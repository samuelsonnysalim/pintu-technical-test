'use client';

import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import TradeService from '@pintu/technical-test/service/trade-service';
import WalletService, {
  SupportedCurrenciesResponse,
} from '@pintu/technical-test/service/wallet-service';
import Percentage from '@pintu/technical-test/app/component/percentage';
import Currency from '@pintu/technical-test/app/component/currency';
import Loading from '@pintu/technical-test/app/component/loading';
import Message from '@pintu/technical-test/app/component/message';

export default function PriceTable() {
  const { data: supportedCurrenciesData } =
    useQuery<SupportedCurrenciesResponse>({
      queryKey: ['supportedCurrencies'],
      queryFn: () => WalletService.listSupportedCurrencies(),
    });
  const { isLoading, error, data } = useQuery({
    queryKey: ['priceChanges'],
    queryFn: () => TradeService.listPriceChanges(),
    refetchInterval: 10000,
  });

  return (
    <div className="flex flex-col">
      {isLoading && <Loading clasName="mt-10 !w-12 !h-12 self-center" />}
      {(error as Error) && (
        <Message className="mt-8" title="Telah Terjadi Error" type="error">
          {(error as Error).message}
        </Message>
      )}
      {supportedCurrenciesData && data && (
        <table className="table-auto w-full border-separate">
          <thead>
            <tr>
              <th className="border border-r-0 border-gray-200 rounded-tl-lg p-5 pl-[75px] text-left text-gray-500 leading-[22px] font-semibold">
                CRYPTO
              </th>
              <th className="border-y border-gray-200 p-5 text-left text-gray-500 leading-[22px] font-semibold">
                HARGA
              </th>
              <th className="border-y border-gray-200 p-5 text-left text-gray-500 leading-[22px] font-semibold">
                24 JAM
              </th>
              <th className="border-y border-gray-200 p-5 text-left text-gray-500 leading-[22px] font-semibold">
                1 MGG
              </th>
              <th className="border-y border-gray-200 p-5 text-left text-gray-500 leading-[22px] font-semibold">
                1 BLN
              </th>
              <th className="border border-l-0 border-gray-200 rounded-tr-lg p-5 text-left text-gray-500 leading-[22px] font-semibold">
                1 THN
              </th>
            </tr>
          </thead>
          <tbody>
            {supportedCurrenciesData?.payload
              .filter(({ currencySymbol }) => currencySymbol !== 'Rp')
              .map((item, index) => {
                const price = data?.payload.find(
                  ({ pair }) =>
                    pair === `${item.currencySymbol.toLowerCase()}/idr`,
                );
                return (
                  <tr key={index}>
                    <td
                      className={classNames(
                        'border-b border-l border-gray-200 p-5',
                        {
                          'rounded-bl-lg':
                            index ===
                            supportedCurrenciesData.payload.length - 1,
                        },
                      )}
                    >
                      <div className="flex">
                        <img
                          className="w-8 h-8 mr-6"
                          src={item.logo}
                          alt={`${item.name} Logo`}
                        />
                        <span className="flex-none grow font-semibold leading-8">
                          {item.name}
                        </span>
                        <span className="w-12 text-gray-500 text-right leading-8">
                          {item.currencySymbol}
                        </span>
                      </div>
                    </td>
                    <td className="border-b border-gray-200 p-5 font-semibold">
                      <Currency value={price?.latestPrice} />
                    </td>
                    <td className="border-b border-gray-200 p-5 font-semibold">
                      <Percentage value={price?.day} />
                    </td>
                    <td className="border-b border-gray-200 p-5 font-semibold">
                      <Percentage value={price?.week} />
                    </td>
                    <td className="border-b border-gray-200 p-5 font-semibold">
                      <Percentage value={price?.month} />
                    </td>
                    <td
                      className={classNames(
                        'border-b border-r border-gray-200 p-5 font-semibold',
                        {
                          'rounded-br-lg':
                            index ===
                            supportedCurrenciesData.payload.length - 1,
                        },
                      )}
                    >
                      <Percentage value={price?.year} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}