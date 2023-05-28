import MarketTagService from '@pintu/technical-test/service/market-tag-service';
import Breadcrumb from '@pintu/technical-test/app/component/breadcrumb';
import PriceTable from '@pintu/technical-test/app/component/price-table';

interface Params {
  slug: string;
}

interface Props {
  params: Params;
}

export default async function Tags(props: Props) {
  const data = (
    await MarketTagService.listMarketTags({
      query: {
        'language.name': 'ID',
        slug_eq: props.params.slug,
      },
    })
  )[0];

  return (
    <>
      {data && (
        <>
          <Breadcrumb
            paths={[
              {
                label: 'Harga Crypto',
                url: '/',
              },
              {
                label: `${data.title} Category`,
                url: `/tags/${props.params.slug}`,
              },
            ]}
          />
          <h1 className="flex items-center mt-6 mb-4 text-xl xl:text-[28px] font-heading font-semibold">
            <img
              className="w-5 h-5 xl:w-7 xl:h-7 mr-4"
              src={data.icon.url}
              alt={`${data.title} Logo`}
            />
            <span className="flex-none grow">{data.title}</span>
          </h1>
          <div className="mb-6 text-sm xl:text-base text-gray-500 leading-[22px]">
            {data.subtitle}
          </div>
          <PriceTable currencies={data.currencies.map(({ name }) => name)} />
        </>
      )}
    </>
  );
}
