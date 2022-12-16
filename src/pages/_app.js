import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import styledNormalize from "styled-normalize";

import { wrapper } from "store";
import theme from "theme";

import "bootswatch/dist/journal/bootstrap.min.css";

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  body {
    background-color: #e7ebf3;
  }
`;

export default function MyApp(props) {
  const { Component, pageProps, ...rest } = props;
  const { store } = wrapper.useWrappedStore({ pageProps, ...rest });
  const title = pageProps.title || "Hello next.js Real World!";
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
      </Helmet>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  );
}
