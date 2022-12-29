const nextCompose = require('next-compose-plugins')
const { withFonts } = require('@moxy/next-common-files')
const TerserPlugin = require('terser-webpack-plugin')
// const optimizedImages = require('next-optimized-images');
// const nextTranslate = require('next-translate')
var moment = require('moment-timezone')
/** @type {import('next').NextConfig} */

const config = {
  // target: "serverless",
  // reactStrictMode: true,
  // distDir: 'folderBuild',
  images: {
    domains: [],
    // loader: 'imgix',
    // path: '',
  },
  env: {
    MONGODB: process.env.MONGODB,
    JWTTOKEN: process.env.JWTTOKEN,
  },
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     '/': { page: '/' },
  //     // '/anggota/?=user_id': { page: '/anggota/[user_id]', query: { user_id: '1' } },
  //     '/dashboard/index': { page: '/dashboard' },
  //     '/dashboard/anggota': { page: '/dashboard/anggota' },
  //     '/dashboard/setting': { page: '/dashboard/setting' },
  //   }
  // },
  webpack: (config) => {
    const newConfig = config

    newConfig.resolve.alias = {
      ...config.resolve.alias,
    }
    // new MomentTimezoneDataPlugin({
    //   matchZones: ['/Asia/Jakarta', 'Etc/UTC'],
    //   startYear: 2020,
    //   endYear: 9999,
    // })
    if (process.env.NODE_ENV === 'production') {
      newConfig.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ]
    }

    return newConfig
  },
  loaders: [
    {
      test: /plugin\.css$/,
      loaders: ['style-loader', 'css'],
    },
  ],
}


// module.exports = nextCompose([withFonts(), optimizedImages], config);
module.exports = nextCompose([withFonts()], config);

