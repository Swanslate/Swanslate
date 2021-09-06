import React, { useContext } from "react";
import Link from "next/link";
import { Button, IconButton, SvgIcon } from "@material-ui/core";
import Image from "next/image";
import logo from "../public/images/logoRight-1.png";
import button1 from "../public/images/mtt2Passive.png";
import button2 from "../public/images/vt-2.png";
import TaskPageIcon from "./icons/TaskPageIcon";
import TranslateIcon from "../public/TranslateIcon.svg";
import Styles from "../styles/SideBar.module.scss";
import appContext from "../lib/helpers/appContext";
import { SIGN_IN } from "../lib/helpers/contextReducer";

export default function SideBarComponent() {
  const { state, dispatch } = useContext(appContext);

  async function handleSignIn() {

    await import("@pinetwork-js/sdk").then(async Pi => {
      try {
        const response = await Pi?.Pi?.authenticate(["username", "payments"], onIncompletePaymentFound);
        if (response?.user?.username) {
          dispatch({
            type: SIGN_IN,
            payload: {
              isSignIn: true,
              userAuth: {
                userName: response.user.username,
                accessToken: response.accessToken,
                uid: response.user.uid
              }
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    });

    function onIncompletePaymentFound(payment: any) { console.log(payment); };
  }


  return (
    <div className={Styles.Container}>
      <IconButton className={Styles.Logo}>
        <Link href="/">
          <a><Image src={logo} alt="logo" layout="fill" objectFit="contain" /></a>

        </Link>
      </IconButton>
      {state.userInfo.isSignIn
        ? <h1 className={Styles.UserName}>
          Welcome {state.userInfo.userAuth.userName}
        </h1>
        : <Button
        color="secondary"
        variant="contained"
          onClick={handleSignIn}>
          Sign In
        </Button>
      }

      <div className={Styles.ButtonGroup}>
        <IconButton className={Styles.btn}>
          <Link href="/translateTasks">
            <a>
              <Image
                src={button1}
                alt="Validate-Task-Button"
                layout="fill"
                objectFit="contain"
              />
            </a>

          </Link>
          {/* <Image
            src={TranslateIcon}
            alt="Translate-Task-Page"
            layout="fill"
            objectFit="contain"
          /> */}
        </IconButton>

        <IconButton className={Styles.btn}>
          <Link href="/validateTasks">
            <a>
              <Image
                src={button2}
                alt="Translate-Task-Button"
                layout="fill"
                objectFit="contain"
              />
            </a>
          </Link>
        </IconButton>
      </div>
    </div>
  );
}
