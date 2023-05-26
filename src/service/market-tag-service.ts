import { createService } from './core';

interface Language {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Icon {
  id: number;
  name: string;
  hash: string;
  sha256: any;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: string;
  provider_metadata: any;
  created_at: string;
  updated_at: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: any;
  previewUrl: any;
}

interface Image {
  id: number;
  name: string;
  hash: string;
  sha256: any;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: string;
  provider_metadata: any;
  created_at: string;
  updated_at: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  previewUrl: any;
}

interface Formats {
  small: Small;
  thumbnail: Thumbnail;
}

interface Small {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

interface Thumbnail {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

interface Currency {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface MarketTagResponse {
  id: number;
  title: string;
  subtitle: string;
  language: Language;
  url: any;
  published_at: string;
  created_at: string;
  updated_at: string;
  statusbar: string;
  order: number;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  icon: Icon;
  image: Image;
  currencies: Currency[];
}

const MarketTagService = {
  listMarketTags: createService<MarketTagResponse[]>({
    url: 'market-tags',
    method: 'get',
  }),
};

export default MarketTagService;
