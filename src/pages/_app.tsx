import 'tailwindcss/tailwind.css'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'
import './../asset/css/globalStyle.css'
import 'antd/dist/antd.css'
import React, { Suspense } from 'react'
import { AppContext } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { createBreakpoint } from 'react-use'
import { useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper'
import moment from 'moment'
import 'moment/locale/id'
import { setScreenSize } from '@features/screen/screen.action'
import { wrapper } from '@redux-state/index'
import { breakScreen } from '@styles/breakpoint'
import gridConfig from '@utils/configs/grid.config'
import { locale } from '@utils/configs/localization.config'
import { ScreenType } from '@utils/types/screen'
import useMobileOS from '@utils/hooks/useMobileOS'
import NProgress from 'nextjs-progressbar'
import Head from 'next/head'
import BRAND_NAME from '@utils/constants/brand'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import i18n from '../../i18n'
import appWithI18n from 'next-translate/appWithI18n'
import { useRouter } from 'next/router'
import 'moment-timezone';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';

/* Configuration Start */
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])
const useScreen = createBreakpoint({ ...breakScreen } as {})
moment.locale(locale.id)
/* Configuration End */

const MainApp = ({ Component, pageProps }) => {
  const router = useRouter()
  const theme = {
    ...gridConfig,
  }
  
  const store = useStore()
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })

  const screen = useScreen()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setScreenSize(screen as ScreenType)) // for set the screen type to global redux
  }, [screen, dispatch])



  let notUseSidebar = [
    '/',
    '/admin/login',
    '/admin/forgot-password',
    '/admin/resend-email-verify',
    '/admin/reset-password',
    '/cm/login',
    '/cm/verify-email',
    '/cm/forgot-password',
    '/cm/resend-email-verify',
    '/cm/reset-password',
    '/cm/api-user/verify-email'
  ]

  let notIncludeSidebatWithSlug = [
    '/[user]/verify-email',
    '/[user]/api-user/verify-email',
    '/[user]/forgot-password'
  ]

  return (
    <>
      <ToastContainer />
      <PersistGate persistor={persistor} loading={<div></div>}>
        <Head>
          {BRAND_NAME}
          <link
            rel="icon"
            href={process.env.CLOUD_ASSETS + '/logo-soegee.png'}
          />
        </Head>
        <NProgress color={'#113CFC'} />

        <ThemeProvider theme={theme}>
          <Suspense fallback={<div>Loading...</div>}>

            <Component {...pageProps} />

          </Suspense>
        </ThemeProvider>

      </PersistGate>
    </>
  )
}

MainApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  return {
    pageProps: {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
      appProp: ctx.pathname,
    },
  }
}

const wrapperRedux = wrapper.withRedux(MainApp)
export default appWithI18n(wrapperRedux, {
  ...i18n,
  skipInitialProps: false,
})
