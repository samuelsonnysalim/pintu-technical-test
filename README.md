# Pintu Technical Test

This repository is a technical test for Pintu Job Application, created by **[Samuel Sonny Salim](https://www.linkedin.com/in/samuelsonnysalim/)**. Using Next.js as its techstack, it will fasten the web app development.

> I use Next.js 13 **App Router** for this project. Please click [here](https://nextjs.org/docs/app) to know more about **App Router**.

## How to start

1. After clone this repository, run:
   ```sh
   yarn
   ```

2. To perform unit test, run:
   ```sh
   yarn test
   ```

3. To start the project, run:
   ```sh
   yarn dev
   ```

4. It will be run on `http://localhost:3000`, to open the url, run:
   ```sh
   open http://localhost:3000
   ```

## Storybook

This repository contains Storybook implementation. Storybook is a catalog for components and pages. We can modify the props directly through Storybook.

To run Storybook, run:
```sh
yarn storybook
```

## Tech Stacks

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Headless UI](https://headlessui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
- [React SVG](https://www.npmjs.com/package/react-svg)
- [Axios](https://axios-http.com/docs/intro)
- [Classnames](https://www.npmjs.com/package/classnames)
- [CSS Mediaquery](https://www.npmjs.com/package/css-mediaquery)
- [Currency Formatter](https://www.npmjs.com/package/currency-formatter)
- [Path Parser](https://www.npmjs.com/package/path-parser)
- [Testing Library](https://testing-library.com/)
- [Jest](https://jestjs.io/) + [TS-Jest](https://www.npmjs.com/package/ts-jest)
- [Nock](https://www.npmjs.com/package/nock)
- [Eslint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [Storybook](https://storybook.js.org/)

## Test Result

```
 PASS  src/app/component/__tests__/search-currency.test.tsx
  SearchCurrency
    ✓ should load component (114 ms)
    ✓ should open search input panel, focus on search input, and supported currencies on click (220 ms)
    ✓ should open search input panel, focus on search input, and supported currencies on click on mobile layout (76 ms)
    ✓ should disable scroll on body while opening search currency on mobile layout (70 ms)
    ✓ should close search input panel on clicking close button (90 ms)
    ✓ should close search input panel on clicking outside the component (90 ms)
    ✓ should clear search input value on reopen (314 ms)
    ✓ should enable scroll on body while closing search currency on mobile layout (209 ms)
    ✓ should call supported currencies api (5 ms)
    ✓ should render supported currencies based on api (68 ms)
    ✓ should filter supported currencies by name based on search input (153 ms)
    ✓ should filter supported currencies by currency symbol based on search input (161 ms)
    ✓ should not found panel if the searched item doesn't exist (154 ms)

 PASS  src/app/component/__tests__/menu.test.tsx (5.187 s)
  Menu
    ✓ should render component (328 ms)
    ✓ should show submenu on hover (599 ms)
    ✓ should render component on mobile layout (32 ms)
    ✓ should open menu on clicking menu icon on mobile layout (188 ms)
    ✓ should close menu on clicking close icon on mobile layout (130 ms)
    ✓ should disable scroll on body while opening menu on mobile layout (45 ms)
    ✓ should enable scroll on body while closing menu on mobile layout (182 ms)
    ✓ should toggle click submenu on mobile layout (775 ms)

 PASS  src/app/__tests__/layout.test.tsx
  RootLayout
    ✓ should load component (400 ms)

 PASS  src/app/__tests__/page.test.tsx
  Home
    ✓ should load component (49 ms)
    ✓ should render SearchCurrency (88 ms)
    ✓ should render TopMovers (315 ms)
    ✓ should render MarketTags (88 ms)
    ✓ should render PriceTable (261 ms)

 PASS  src/app/component/__tests__/market-tags.test.tsx
  MarketTags
    ✓ should call market tags api (37 ms)
    ✓ should render market tags with link (69 ms)

 PASS  src/app/component/__tests__/top-movers.test.tsx
  TopMovers
    ✓ should render 6 top movers (458 ms)

 PASS  src/app/component/__tests__/price-table.test.tsx (8.004 s)
  PriceTable
    ✓ should load component (188 ms)
    ✓ should call supported currencies and price changes api (127 ms)
    ✓ should render price changes table (581 ms)
    ✓ should render price changes table on mobile layout (155 ms)
    ✓ should be able to select date range to "24 JAM" and render percentage based on it on mobile layout (247 ms)
    ✓ should be able to select date range to "1 MGG" and render percentage based on it on mobile layout (1108 ms)
    ✓ should be able to select date range to "1 BLN" and render percentage based on it on mobile layout (1078 ms)
    ✓ should be able to select date range to "1 THN" and render percentage based on it on mobile layout (1063 ms)
    ✓ should render price changes table with auto refetch (117 ms)
    ✓ should render price changes table based on currencies passed to the props (66 ms)

 PASS  src/app/component/__tests__/message.test.tsx
  Message
    ✓ should load component (37 ms)
    ✓ should load component with title (6 ms)
    ✓ should load component with type error (3 ms)
    ✓ should load component with type success (12 ms)
    ✓ should load component with type warning (4 ms)
    ✓ should load component with type info (4 ms)

 PASS  src/app/component/__tests__/currency.test.tsx
  Currency
    ✓ should load component (30 ms)
    ✓ should render value in currency formatted (3 ms)
    ✓ should render value with green text color after updated with greater than previous value (12 ms)
    ✓ should render value with red text color after updated with lower than previous value (15 ms)
    ✓ should disable render value with green text color after updated with greater than previous value if the "enableValueChangeIndicator" is false (4 ms)
    ✓ should disable render value with red text color after updated with lower than previous value if the "enableValueChangeIndicator" is false (13 ms)

 PASS  src/app/tags/[slug]/__tests__/page.test.tsx
  Tags
    ✓ should call market tags api (74 ms)
    ✓ should render Breadcrumb (71 ms)
    ✓ should render page title and subtitle (37 ms)
    ✓ should render PriceTable (160 ms)

 PASS  src/app/component/__tests__/breadcrumb.test.tsx
  Breadcrumb
    ✓ should load component (46 ms)
    ✓ should render breadcrumbs based on paths passed to the props (13 ms)

 PASS  src/app/__tests__/client-provider.test.tsx
  ClientProvider
    ✓ should load component (36 ms)

 PASS  src/app/component/__tests__/percentage.test.tsx
  Percentage
    ✓ should load component (22 ms)
    ✓ should render value with green caret up for positive value greater than zero (5 ms)
    ✓ should render value with red caret down for negative value (6 ms)

Test Suites: 13 passed, 13 total
Tests:       62 passed, 62 total
Snapshots:   0 total
Time:        11.437 s, estimated 17 s
```

## Demo

Demo is hosted by **[Vercel](https://vercel.com/)**, please look at the demo below:

- [Demo](https://pintu-technical-test.vercel.app/)
- [Storyboard](https://pintu-technical-test-storybook.vercel.app/)