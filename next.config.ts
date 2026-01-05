import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['jose', 'until-async'], // fixes errors in unit tests that use msw or jose
}

export default nextConfig
