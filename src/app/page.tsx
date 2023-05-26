import PriceTable from '@pintu/technical-test/app/component/price-table';
import SearchCurrency from '@pintu/technical-test/app/component/search-currency';

export default function Home() {
  return (
    <>
      <div className="flex mb-8">
        <h1 className="flex-none grow text-[28px] font-heading font-semibold">
          Harga Crypto dalam Rupiah Hari Ini
        </h1>
        <SearchCurrency className="w-[384px]" />
      </div>
      <PriceTable />
    </>
  );
}
