'use client';

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import WalletService from '@pintu/technical-test/service/wallet-service';
import Loading from '@pintu/technical-test/app/component/loading';
import Message from '@pintu/technical-test/app/component/message';

interface Props {
  className: string;
}

export default function SearchCurrency(props: Partial<Props>) {
  const searchInput = useRef<HTMLInputElement>(null);
  const [isShown, setShown] = useState<boolean>(false);
  const [searchCurrency, setSearchCurrency] = useState<string>('');
  const { isLoading, error, data } = useQuery({
    queryKey: ['supportedCurrencies'],
    queryFn: () => WalletService.listSupportedCurrencies(),
  });
  const filteredCurrencies =
    data?.payload.filter(({ name }) =>
      name.toLowerCase().includes(searchCurrency.toLowerCase()),
    ) || [];

  const open = useCallback(() => setShown(true), []);
  const close = useCallback(() => setShown(false), []);
  const change = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearchCurrency(e.target.value),
    [],
  );

  useEffect(() => {
    if (isShown && searchInput) {
      searchInput.current?.focus();
    }
  }, [isShown, searchInput]);

  return (
    <div className={classNames('relative z-0', props.className)}>
      <div
        className="flex bg-gray-100 text-gray-400 text-sm leading-5 py-3 px-4 rounded-lg cursor-pointer"
        onClick={open}
      >
        <i className="bg-magnifier w-5 h-5 mr-4" />
        <span className="flex-none grow">Cari aset di Pintu...</span>
      </div>
      {isShown && (
        <div className="absolute top-0 right-0 left-0 m-auto p-4 bg-white border border-gray-200 rounded-lg">
          <div className="relative mb-2">
            <input
              ref={searchInput}
              type="text"
              className="w-full bg-gray-100 text-sm leading-5 py-3 px-[3.25rem] rounded-lg outline-0 placeholder:text-gray-400"
              placeholder="Cari aset di Pintu..."
              value={searchCurrency}
              onChange={change}
            />
            <i className="absolute bg-magnifier w-5 h-5 mr-4 top-0 bottom-0 left-4 m-auto" />
            <a
              className="absolute bg-close w-5 h-5 top-1 bottom-0 right-4 m-auto cursor-pointer"
              title="Close"
              onClick={close}
            />
          </div>
          <div className="h-[320px] -mx-4 -mb-4 px-4 pb-4 overflow-y-auto">
            <div className="flex flex-col space-y-4">
              {isLoading && <Loading clasName="mt-10 self-center" />}
              {(error as Error) && (
                <Message
                  className="mt-8"
                  title="Telah Terjadi Error"
                  type="error"
                >
                  {(error as Error).message}
                </Message>
              )}
              {data &&
                (filteredCurrencies.length > 0 ? (
                  filteredCurrencies
                    .filter(({ currencySymbol }) => currencySymbol !== 'Rp')
                    .map((item, index) => (
                      <a
                        key={index}
                        className="flex p-2 leading-[22px] rounded-lg hover:bg-gray-100"
                        href="#"
                      >
                        <img
                          className="w-4 h-[22px] mr-2"
                          src={item.logo}
                          alt={`${item.name} Logo`}
                        />
                        <span className="flex-none grow font-medium">
                          {item.name}
                        </span>
                        <span className="w-12 text-gray-500 text-right">
                          {item.currencySymbol}
                        </span>
                      </a>
                    ))
                ) : (
                  <div className="mt-10 text-center text-sm">
                    <div className="font-semibold">
                      &quot;{searchCurrency}&quot; Tidak Ditemukan
                    </div>
                    <div className="text-gray-500">
                      Kata kunci tidak sesuai atau aset belum ada di Pintu
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
