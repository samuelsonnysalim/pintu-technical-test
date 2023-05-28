'use client';

import { useState } from 'react';
import { ReactSVG } from 'react-svg';
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

interface Props {
  currencies: string[];
}

type DateRange = 'day' | 'week' | 'month' | 'year';

export default function PriceTable(props: Partial<Props>) {
  const { data: supportedCurrenciesData } =
    useQuery<SupportedCurrenciesResponse>({
      queryKey: ['supportedCurrencies'],
      queryFn: () => WalletService.listSupportedCurrencies(),
    });
  const { isLoading, error, data } = useQuery({
    queryKey: ['priceChanges'],
    queryFn: () => TradeService.listPriceChanges(),
    refetchInterval: 1000,
  });
  const [dateRange, setDateRange] = useState<DateRange>('day');

  const filteredSupportedCurrencies = supportedCurrenciesData?.payload.filter(
    ({ currencySymbol }) =>
      currencySymbol !== 'Rp' &&
      (!props.currencies || props.currencies.includes(currencySymbol)),
  );

  return (
    <div className="flex flex-col -mx-4 xl:mx-0">
      {isLoading && <Loading clasName="mt-10 !w-12 !h-12 self-center" />}
      {(error as Error) && (
        <Message className="mt-8" title="Telah Terjadi Error" type="error">
          {(error as Error).message}
        </Message>
      )}
      {supportedCurrenciesData && data && (
        <>
          {/* MOBILE */}
          <div className="xl:hidden">
            <div className="flex items-center p-4 border-t border-b border-gray-200">
              <span className="flex-none grow text-xs font-semibold">
                CRYPTO
              </span>
              <select
                className="border border-gray-200 p-1 text-xs font-semibold rounded-lg"
                title="Select Date Range"
                value={dateRange}
                onChange={(e) =>
                  setDateRange(e.target.selectedOptions[0]?.value as DateRange)
                }
              >
                <option value="day">24 JAM</option>
                <option value="week">1 MGG</option>
                <option value="month">1 BLN</option>
                <option value="year">1 THN</option>
              </select>
            </div>
            {filteredSupportedCurrencies?.map((item, index) => {
              const price = data?.payload.find(
                ({ pair }) =>
                  pair === `${item.currencySymbol.toLowerCase()}/idr`,
              );
              return (
                <div
                  key={index}
                  className="flex items-center p-4 border-b border-gray-200"
                >
                  <ReactSVG
                    className="w-8 h-8 mr-6"
                    beforeInjection={(svg) => {
                      svg.setAttribute(
                        'style',
                        `width: 2rem; height: 2rem; color: ${item.color}`,
                      );
                    }}
                    src={item.logo}
                    title={`${item.name} Logo`}
                  />
                  <div className="flex grow">
                    <div className="flex flex-col w-1/2">
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-sm text-gray-500">
                        {item.currencySymbol}
                      </span>
                    </div>
                    <div className="flex flex-col w-1/2">
                      <div className="text-right font-semibold">
                        <Currency value={price?.latestPrice} />
                      </div>
                      <div className="flex justify-end text-sm">
                        <Percentage value={price ? price[dateRange] : 0} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DESKTOP */}
          <table className="hidden xl:table table-auto w-full border-separate">
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
              {filteredSupportedCurrencies?.map((item, index) => {
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
                            index === filteredSupportedCurrencies.length - 1,
                        },
                      )}
                    >
                      <div className="flex">
                        <ReactSVG
                          className="w-8 h-8 mr-6"
                          beforeInjection={(svg) => {
                            svg.setAttribute(
                              'style',
                              `width: 2rem; height: 2rem; color: ${item.color}`,
                            );
                          }}
                          src={item.logo}
                          title={`${item.name} Logo`}
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
                            index === filteredSupportedCurrencies.length - 1,
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
        </>
      )}
    </div>
  );
}
