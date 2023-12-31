import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`/images/events-logo.png`}
        />
      </Head>
      <body>
        <div id="modal"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
