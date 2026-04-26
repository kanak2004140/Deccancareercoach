import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Deccan Career Coach - AI-Powered Skill Assessment</title>
        <meta name="description" content="AI-powered personalized learning plans based on job descriptions" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
