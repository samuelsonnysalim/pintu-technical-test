/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        page: "1280px"
      },
      backgroundImage: {
        logo: "url(/logo.svg)",
        "flag-id": "url(/flag-id.svg)",
        "price-chart": "url(/price-chart.svg)",
        "safe-box": "url(/safe-box.svg)",
        "price-tag": "url(/price-tag.svg)",
        "lending": "url(/lending.svg)",
        "support": "url(/support.svg)",
        "pintu-logo": "url(/pintu-logo.svg)",
        idea: "url(/idea.svg)",
        bubble: "url(/bubble.svg)",
        telegram: "url(/telegram.svg)",
        twitter: "url(/twitter.svg)",
        instagram: "url(/instagram.svg)",
        youtube: "url(/youtube.svg)",
        facebook: "url(/facebook.svg)",
        discord: "url(/discord.svg)",
        blog: "url(/blog.svg)",
        news: "url(/news.svg)",
        "press-kit": "url(/press-kit.svg)",
        briefcase: "url(/briefcase.svg)",
        code: "url(/code.svg)",
      },
    },
  },
  plugins: [],
}
