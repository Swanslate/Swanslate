import {
  Button,
  Card,
  Divider,
  Menu,
  MenuItem,
  TextField,
} from "@material-ui/core";
import moment from "moment";
import React, { useContext, useState } from "react";
import { ITasks, validateTask } from "../lib/entities/IContext";
import AppContext from "../lib/helpers/appContext";
import { UPDATE_VALIDATION_TASKS } from "../lib/helpers/contextReducer";
import Styles from "../styles/TranslateTaskCard.module.scss";

type TaskCardProps = {
  task: validateTask;
};

export default function TranslateTaskCard({ task }: TaskCardProps) {

  const { state, dispatch } = useContext(AppContext);
  const [value, setValue] = useState("");

  function handleApprove() {
    dispatch({
      type: UPDATE_VALIDATION_TASKS,
      payload: task.id
    });
    setValue("");
  }
  function handleCorrectionSubmit() {
    if (value) {
      dispatch({
        type: UPDATE_VALIDATION_TASKS,
        payload: task.id
      });
      setValue("");
    }

  }


  function handleOnChangeValue(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <>
      <Card className={Styles.card} elevation={3}>
        <div className={Styles.cardContent}>
          <strong>Item Id: </strong>
          <span>{task.id}</span>
          <Divider orientation="vertical" />
          <strong>Date:</strong>
          <span>{moment().format("MMM Do YY")}</span>
          <p>
            <strong>Original Text: </strong>
            {task?.originalText}
          </p>
          <p>
            <strong>Translated Text [{Object.keys(task.translatedText)[0]}]: </strong>
            {Object.values(task.translatedText)[0]}
          </p>
        </div>

        <Divider />
        <div style={{ marginTop: "1rem" }} className={Styles.cardContent}>
        </div>
        <TextField
          margin="dense"
          multiline={true}
          variant="outlined"
          value={value}
          onChange={handleOnChangeValue}
        />
        <div className={Styles.buttonContainer}>
          <Button
            variant="contained"
            color="secondary"
            className={Styles.button}
            onClick={handleCorrectionSubmit}
          >
            Apply Correction
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={Styles.button}
            onClick={handleApprove}
          >
            Approve
          </Button>
        </div>
      </Card>
    </>
  );
}
