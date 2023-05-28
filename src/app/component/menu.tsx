'use client';

import { Fragment, ReactNode, useCallback, useState } from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import { Popover, Transition } from '@headlessui/react';

interface SubMenu {
  iconClassName: string;
  label: string | ReactNode;
  description: string;
  url?: string;
}

interface Menu {
  label: string;
  url?: string;
  subMenus?: SubMenu[];
}

const menus: Menu[] = [
  {
    label: 'Fitur',
    subMenus: [
      {
        iconClassName: 'bg-price-chart',
        label: 'Harga Cryptocurrency',
        description: 'Pantau harga Bitcoin dan aset crypto lainnya',
      },
      {
        iconClassName: 'bg-safe-box',
        label: 'Earn',
        description: 'Simpan aset crypto, dapatkan bunga tiap jam',
      },
      {
        iconClassName: 'bg-price-tag',
        label: 'Biaya Transaksi',
        description: 'Lihat biaya trading, tarik Rupiah, dan kirim aset crypto',
      },
      {
        iconClassName: 'bg-lending',
        label: 'Limit Trading Beli/Jual',
        description: 'Ketahui jumlah minimum dan maksimum trading di Pintu',
      },
      {
        iconClassName: 'bg-support',
        label: 'OTC',
        description:
          'Layanan personal dengan harga khusus untuk transaksi dengan jumlah besar',
      },
    ],
  },
  { label: 'PTU' },
  {
    label: 'Edukasi',
    subMenus: [
      {
        iconClassName: 'bg-pintu-logo',
        label: 'Tentang',
        description: 'Jelajahi dunia crypto bersama Pintu',
      },
      {
        iconClassName: 'bg-idea',
        label: 'Pintu Academy',
        description:
          'Kumpulan artikel untuk bantu kamu memahami crypto dengan lebih gampang',
      },
      {
        iconClassName: 'bg-bubble',
        label: 'FAQ',
        description:
          'Informasi seputar crypto dan cara menggunakan aplikasi Pintu',
      },
    ],
  },
  {
    label: 'Ikuti Kami',
    subMenus: [
      {
        iconClassName: 'bg-telegram',
        label: 'Telegram',
        description: '@pintuindonesia',
      },
      {
        iconClassName: 'bg-twitter',
        label: 'Twitter',
        description: '@pintuID',
      },
      {
        iconClassName: 'bg-instagram',
        label: 'Instagram',
        description: '@pintu_id',
      },
      {
        iconClassName: 'bg-youtube',
        label: 'Youtube',
        description: 'Pintu - Aplikasi Jual Beli Cryptocurrency',
      },
      {
        iconClassName: 'bg-facebook',
        label: 'Facebook',
        description: 'pintucrypto',
      },
      {
        iconClassName: 'bg-discord',
        label: 'Discord',
        description: 'pintuindonesia',
      },
    ],
  },
  {
    label: 'Blog & News',
    subMenus: [
      {
        iconClassName: 'bg-blog',
        label: 'Pintu Blog',
        description:
          'Kumpulan artikel crypto, keuangan, dan informasi terbaru terkait Pintu.',
      },
      {
        iconClassName: 'bg-news',
        label: 'Pintu News',
        description:
          'Temukan update berita terkini tentang crypto, blockchain, hingga NFT!',
      },
      {
        iconClassName: 'bg-press-kit',
        label: 'Pintu Press Kit',
        description:
          'Temukan logo resmi, foto, dan kumpulan press release Pintu untuk materi promosi di sini.',
      },
    ],
  },
  {
    label: 'Karier',
    subMenus: [
      {
        iconClassName: 'bg-briefcase',
        label: (
          <>
            Karier
            <span className="bg-blue-600 text-white text-sm rounded-lg py-1 px-2 ml-2">
              We&apos;re Hiring!
            </span>
          </>
        ),
        description: 'Temukan pekerjaan impianmu di sini.',
      },
      {
        iconClassName: 'bg-code',
        label: (
          <>
            Karier Engineering
            <span className="bg-blue-600 text-white text-sm rounded-lg py-1 px-2 ml-2">
              We&apos;re Hiring!
            </span>
          </>
        ),
        description:
          'Bergabung dengan tim engineering kami menciptakan platform blockchain yang canggih.',
      },
    ],
  },
];

export default function Menu() {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>();
  const [isMobileMenuShown, setMobileMenuShown] = useState<boolean>(false);
  const [openedMobileMenuIndexes, setOpenedMobileMenuIndexes] = useState<
    number[]
  >([]);

  const showPanel = useCallback(
    (index: number) => setSelectedMenuIndex(index),
    [],
  );

  const hidePanel = useCallback(() => setSelectedMenuIndex(undefined), []);
  const openMobileMenu = useCallback(() => setMobileMenuShown(true), []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuShown(false);
    setOpenedMobileMenuIndexes([]);
  }, []);

  const toggleMobileMenu = useCallback(
    (index: number) => {
      const arrIndex = openedMobileMenuIndexes.indexOf(index);
      if (arrIndex != -1) {
        openedMobileMenuIndexes.splice(arrIndex);
      } else {
        openedMobileMenuIndexes.push(index);
      }
      setOpenedMobileMenuIndexes([...openedMobileMenuIndexes]);
    },
    [openedMobileMenuIndexes],
  );

  return (
    <>
      {/* MOBILE */}
      <a
        className="block xl:hidden w-[25px] h-[25px] -mt-[4.5px] bg-menu float-right"
        title="Show Menu"
        onClick={openMobileMenu}
      />
      <Transition
        show={isMobileMenuShown}
        className="block xl:hidden fixed bg-white top-0 right-0 bottom-0 left-0 m-auto overflow-y-auto"
        enter="transition duration-400 ease-out"
        enterFrom="transform -translate-y-full"
        enterTo="transform translate-y-0"
        leave="transition duration-400 ease-out"
        leaveFrom="transform translate-y-0"
        leaveTo="transform -translate-y-full"
      >
        <div className="flex flex-col">
          <header className="p-8 border-b border-gray-200">
            <i className="block w-[75px] h-4 bg-logo float-left" />
            <a
              className="block w-4 h-4 bg-close float-right"
              title="Close Menu"
              onClick={closeMobileMenu}
            />
          </header>
          {menus.map((menu, index) => {
            const opened = openedMobileMenuIndexes.includes(index);
            return (
              <div
                key={index}
                className="flex flex-col border-b border-gray-200"
              >
                <a
                  className={classNames('py-6 px-4', {
                    'font-bold text-blue-600 stroke-blue-600': opened,
                    'stroke-gray-500': !opened,
                  })}
                  {...(!menu.subMenus
                    ? { href: menu.url || '#' }
                    : { onClick: () => toggleMobileMenu(index) })}
                >
                  {menu.label}
                  {menu.subMenus && (
                    <ReactSVG
                      className={classNames(
                        'block w-5 h-2.5 mt-2 float-right',
                        { 'rotate-180': opened },
                      )}
                      beforeInjection={(svg) => {
                        svg.setAttribute(
                          'style',
                          'width: 1.25rem; height: 0.625rem;',
                        );
                      }}
                      src="/down.svg"
                    />
                  )}
                </a>
                {opened &&
                  menu.subMenus?.map((subMenu, index) => (
                    <a
                      key={index}
                      className="flex py-6 px-4"
                      href={subMenu.url || '#'}
                    >
                      <i
                        className={classNames(
                          subMenu.iconClassName,
                          'flex-none w-6 h-6 mt-1 mr-3',
                        )}
                      />
                      <div className="flex flex-col grow">
                        <span className="font-bold mb-2">{subMenu.label}</span>
                        <span className="text-xs text-slate-500">
                          {subMenu.description}
                        </span>
                      </div>
                    </a>
                  ))}
              </div>
            );
          })}
          <a className="flex items-center justify-center py-5 px-4" href="#">
            <i className="w-[34px] h-[22px] mr-3 bg-flag-id" />
            Bahasa Indonesia
          </a>
        </div>
      </Transition>

      {/* DESKTOP */}
      <nav
        className="hidden xl:flex relative z-10 flex -mt-1 float-right"
        onMouseLeave={hidePanel}
      >
        {menus.map((menu, index) => (
          <Fragment key={index}>
            {menu.subMenus ? (
              <Popover>
                <Popover.Button
                  className="px-10 leading-6 outline-0 hover:text-slate-600"
                  onMouseEnter={() => showPanel(index)}
                >
                  {menu.label}
                </Popover.Button>
                <Transition
                  show={index === selectedMenuIndex}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Popover.Panel
                    className={classNames('absolute w-[408px] z-10 pt-4', {
                      'right-0': index === menus.length - 1,
                    })}
                    onMouseLeave={hidePanel}
                  >
                    <div className="flex flex-col space-y-3 rounded-lg bg-white drop-shadow p-3">
                      {menu.subMenus.map((subMenu, index) => (
                        <a
                          key={index}
                          className="flex flex-row space-x-3 p-4 rounded-lg hover:bg-sky-50"
                          href={subMenu.url || '#'}
                        >
                          <i
                            className={classNames(
                              subMenu.iconClassName,
                              'flex-none w-6 h-6 mt-1',
                            )}
                          />
                          <div className="flex flex-col grow">
                            <span className="font-bold mb-2">
                              {subMenu.label}
                            </span>
                            <span className="text-xs text-slate-500">
                              {subMenu.description}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            ) : (
              <a
                className="px-10 leading-6 outline-0 hover:text-slate-600"
                href={menu.url || '#'}
                onMouseEnter={hidePanel}
              >
                {menu.label}
              </a>
            )}
          </Fragment>
        ))}
        <a href="#" className="bg-flag-id w-[34px] h-[22px] ml-4"></a>
      </nav>
    </>
  );
}
