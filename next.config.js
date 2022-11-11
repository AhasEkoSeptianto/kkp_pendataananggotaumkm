const nextCompose = require('next-compose-plugins')
const { withFonts } = require('@moxy/next-common-files')
const TerserPlugin = require('terser-webpack-plugin')
const nextTranslate = require('next-translate')
var moment = require('moment-timezone')
/** @type {import('next').NextConfig} */

const config = {
  // target: "serverless",
  // reactStrictMode: true,
  // distDir: 'folderBuild',
  images: {
    domains: [],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    MONGODB: process.env.MONGODB,
    JWTTOKEN: process.env.JWTTOKEN,
  },
  webpack: (config) => {
    const newConfig = config

    newConfig.resolve.alias = {
      ...config.resolve.alias,
    }
    new MomentTimezoneDataPlugin({
      matchZones: ['/Asia/Jakarta', 'Etc/UTC'],
      startYear: 2020,
      endYear: 9999,
    })
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


module.exports = nextCompose([withFonts(), nextTranslate()], config);

