import React from "react";
import Styles from "../styles/Layout.module.scss";
import SideBarComponent from "./SideBarComponent";

type LayoutProps = {
  setUserAuth?: any;
  setUserName?: any
  children?: React.ReactElement;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className={Styles.line}></div>

      <div className={Styles.container}>
        <aside className={Styles.sideBar}>
          <SideBarComponent />
        </aside>
        <div className={Styles.content}>{children}</div>
      </div>

      <div className={Styles.line}></div>
    </>
  );
}
