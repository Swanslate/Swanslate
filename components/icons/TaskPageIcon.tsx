import { SvgIcon } from "@material-ui/core";
import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import TranslateIcon from "../../public/TranslateIcon.svg";


export default function TaskPageIcon() {
  return (
    <>
      <SvgIcon>
        <TranslateIcon />
      </SvgIcon>
    </>
  );
}
