'use client';

import { ReactSVG } from 'react-svg';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import MarketTagService from '@pintu/technical-test/service/market-tag-service';

export default function MarketTags() {
  const { data } = useQuery({
    queryKey: ['marketTags'],
    queryFn: () =>
      MarketTagService.listMarketTags({
        query: {
          'language.name': 'ID',
          _sort: 'order:ASC',
        },
      }),
  });
  return (
    <div className="flex flex-wrap mb-6 space-x-2">
      {data?.map((item, index) => (
        <Link
          key={index}
          href={`tags/${item.slug}`}
          className="flex items-center p-2 bg-blue-100 text-blue-600 text-xs font-semibold rounded-lg"
        >
          <ReactSVG
            className="w-6 h-6 text-blue-600 mr-2"
            fill="#2563eb"
            src={`api/svg?url=${item.icon.url}`}
            title={`${item.title} Logo`}
          />
          {item.title}
        </Link>
      ))}
    </div>
  );
}
