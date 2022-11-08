import LoginDefaultPage from '@base/src/templates/auth/login'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer />

      <LoginDefaultPage />
    </div>
  )
}
