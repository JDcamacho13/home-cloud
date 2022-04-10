import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html>
        <Head>
          <title>My page</title>
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
          <NextScript />
        </body>
      </Html>
    )
  }
}