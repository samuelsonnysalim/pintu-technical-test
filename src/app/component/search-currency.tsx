'use client';

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  className: string;
}

export default function SearchCurrency(props: Partial<Props>) {
  const searchInput = useRef<HTMLInputElement>(null);
  const [isShown, setShown] = useState<boolean>(false);
  const [searchCurrency, setSearchCurrency] = useState<string>();

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
    <div className={props.className}>
      {!isShown ? (
        <div
          className="flex bg-gray-100 text-gray-400 text-sm leading-5 py-3 px-4 rounded-lg cursor-pointer"
          onClick={open}
        >
          <i className="bg-magnifier w-5 h-5 mr-4" />
          <span className="flex-none grow">Cari aset di Pintu...</span>
        </div>
      ) : (
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="relative mb-2">
            <input
              ref={searchInput}
              type="text"
              className="w-full bg-gray-100 text-gray-500 text-sm leading-5 py-3 px-[3.25rem] rounded-lg outline-0 placeholder:text-gray-400"
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
              <a
                className="flex p-2 leading-[22px] rounded-lg hover:bg-gray-100"
                href="#"
              >
                <img
                  className="w-4 h-[22px] mr-2"
                  src="https://s3-ap-southeast-1.amazonaws.com/static.pintu.co.id/assets/images/logo/circle_IDRT.svg"
                />
                <span className="flex-none grow font-medium">Rupiah Token</span>
                <span className="w-12 text-gray-500 text-right">WWW</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
