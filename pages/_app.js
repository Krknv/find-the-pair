import { createGlobalStyle } from 'styled-components';
import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef;
    font-family: 'Ubuntu', sans-serif;
    margin: 0;
  }
`;

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Find The Pair</title>
          <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,700" rel="stylesheet" />
          {this.props.styleTags}
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </Container>
    );
  }
}
