'use client';

import { ReactSVG } from 'react-svg';
import { useQuery } from '@tanstack/react-query';
import TradeService from '@pintu/technical-test/service/trade-service';
import WalletService, {
  SupportedCurrenciesResponse,
} from '@pintu/technical-test/service/wallet-service';
import Currency from '@pintu/technical-test/app/component/currency';
import Percentage from '@pintu/technical-test/app/component/percentage';

export default function TopMovers() {
  const { data: supportedCurrenciesData } =
    useQuery<SupportedCurrenciesResponse>({
      queryKey: ['supportedCurrencies'],
      queryFn: () => WalletService.listSupportedCurrencies(),
    });
  const { data } = useQuery({
    queryKey: ['priceChanges'],
    queryFn: () => TradeService.listPriceChanges(),
    refetchInterval: 1000,
  });

  const topMovers = data?.payload
    .sort(
      ({ day: a }, { day: b }) =>
        Math.abs(parseFloat(b)) - Math.abs(parseFloat(a)),
    )
    .slice(0, 6);

  return (
    <div className="mt-4 mb-6">
      {topMovers && (
        <>
          <h2 className="text-lg font-heading font-semibold mb-2">
            🔥 Top Movers (24 Jam)
          </h2>
          <div className="overflow-y-auto">
            <div className="flex w-page xl:w-full gap-x-6">
              {topMovers.map((item, index) => {
                const currency = supportedCurrenciesData?.payload.find(
                  ({ currencySymbol }) =>
                    item.pair === `${currencySymbol.toLowerCase()}/idr`,
                );
                return (
                  <a
                    key={index}
                    className="flex flex-col w-1/6 p-4 overflow-hidden hover:bg-gray-100"
                    href="#"
                  >
                    <div className="flex mb-2">
                      <ReactSVG
                        className="w-8 h-8 mr-2"
                        beforeInjection={(svg) => {
                          svg.setAttribute(
                            'style',
                            `width: 2rem; height: 2rem; color: ${currency?.color}`,
                          );
                        }}
                        src={currency?.logo || ''}
                        title={`${currency?.name} Logo`}
                      />
                      <div className="h-8 text-base xl:text-xl whitespace-nowrap text-ellipsis !leading-8 font-semibold overflow-hidden">
                        {currency?.name}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      <Currency
                        enableValueChangeIndicator={false}
                        value={item.latestPrice}
                      />
                    </div>
                    <div className="text-lg xl:text-xl font-semibold xl:font-bold">
                      <Percentage value={item.day} />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
