import PriceTable from '@pintu/technical-test/app/component/price-table';
import SearchCurrency from '@pintu/technical-test/app/component/search-currency';
import MarketTags from '@pintu/technical-test/app/component/market-tags';
import TopMovers from '@pintu/technical-test/app/component/top-movers';

export default function Home() {
  return (
    <>
      <div className="flex mb-8">
        <h1 className="flex-1 text-xl xl:text-[28px] xl:leading-[44px] font-heading font-semibold">
          Harga Crypto dalam Rupiah Hari Ini
        </h1>
        <SearchCurrency className="w-auto xl:w-[384px]" />
      </div>
      <TopMovers />
      <MarketTags />
      <PriceTable />
    </>
  );
}
