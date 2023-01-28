import LoginDefaultPageToko from '@base/src/templates/auth/loginToko'
import Head from 'next/head'


export default function Home() {
  return (
    <div>
      <Head>
        <title>UMKM Paguyuban bekasi</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      

      <LoginDefaultPageToko />
    </div>
  )
}