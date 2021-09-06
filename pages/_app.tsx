import type { AppProps } from "next/app";
import React, { useEffect, useReducer, useState } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "../lib/theme";
import "../styles/globals.scss";
import AppContext, { initialState } from "../lib/helpers/appContext";
import { getTranslateTasks } from "../lib/helpers/getTranslateTasks";
import { contextReducer, GET_TASKS } from "../lib/helpers/contextReducer";

function MyApp({ Component, pageProps }: AppProps) {

  const [state, dispatch] = useReducer(contextReducer, initialState);

  useEffect(() => {
    getTranslateTasks().then(res => {
      if (res)
        dispatch({ type: GET_TASKS, payload: res });
    });
  }, []);

  useEffect(() => {
    if ((globalThis)?.window) {
      const { Pi } = require("@pinetwork-js/sdk");
      console.log(process.env.NODE_ENV);
      Pi?.init({ version: "2.0", sandbox: true });
    }
  }, []);


  return (
    <>
      <AppContext.Provider value={{ state, dispatch }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} dispatch={dispatch} />
      </ThemeProvider>
      </AppContext.Provider>
    </>
  );
}

export default MyApp;
