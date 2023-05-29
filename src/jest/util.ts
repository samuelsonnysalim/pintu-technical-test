/* eslint-disable @typescript-eslint/no-empty-function */
import mediaQuery from 'css-mediaquery';

function createMatchMedia(width: number) {
  return (query: string) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: '',
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  };
}

export function resizeScreenSize(width: number) {
  window.matchMedia = createMatchMedia(width);
}
