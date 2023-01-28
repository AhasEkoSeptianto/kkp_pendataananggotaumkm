import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="id">
        <Head>
          {CssBaseline.flush()}
          <link rel="shortcut icon" href="/favicon_real.ico" />  
        </Head>
        <Main />
        <NextScript />
      </Html>
    )
  }
}

export default MyDocument
