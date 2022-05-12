// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html>
        <Head>

          <style>{`
            #__next { 
              position: relative;
              min-height: 100vh;
              display: grid;
              grid-template-rows: min-content 1fr;
              margin: 0 auto;
              width: 90%;
              max-width: 90%;
            }
          `}
          </style>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <div id="modal"></div>
          <NextScript />
        </body>
      </Html>
    )
  }
}
