import Head from "next/head";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import AppContext from "../lib/helpers/appContext";
import Styles from "../styles/Home.module.scss";


export default function Home() {
  const { state } = useContext(AppContext)

  return (
    <div>
      <Head>
        <title>Swanslate</title>
        <meta name="description" content="Swanslate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <>
          <h1 className={Styles.motto}>
            Beautiful Translations
            <br />
            Instantly Delivered
          </h1>
          <h3 className={Styles.subContent}>
            Translation and localization tasks <br />
            Powered by millions of Pioneers around the World <br />
            Start earning Pi now!
          </h3>
        </>
      </Layout>
    </div>
  );
}


