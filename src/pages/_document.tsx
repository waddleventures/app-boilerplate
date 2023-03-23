import { Html, Head, Main, NextScript } from "next/document";

function MyDocument() {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body className="h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;