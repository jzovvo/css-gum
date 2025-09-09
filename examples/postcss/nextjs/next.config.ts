import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname, // 或你想要指定的專案根目錄
  },
}

export default nextConfig
