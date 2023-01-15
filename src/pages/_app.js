import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import styledNormalize from "styled-normalize";

import { createStore } from "@store";
import theme from "theme";

import "bootswatch/dist/flatly/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import "@styles/index.scss";

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
`;

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const store = createStore();
  const title = pageProps.title || "Hello next.js Real World!";
  const getLayout = Component.getLayout || ((page) => page);
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
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </ThemeProvider>
    </>
  );
}
