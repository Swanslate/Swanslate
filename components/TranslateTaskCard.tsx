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
import { ITasks, translateTask } from "../lib/entities/IContext";
import AppContext from "../lib/helpers/appContext";
import { UPDATE_TRANSLATE_TASKS } from "../lib/helpers/contextReducer";
import Styles from "../styles/TranslateTaskCard.module.scss"

type TaskCardProps = {
  task: translateTask
};

export default function TranslateTaskCard({ task }: TaskCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [choosedLanguage, setChoosedLanguage] = useState("Choose a Language");
  const [value, setValue] = useState("")
  const { state, dispatch } = useContext(AppContext)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleChooseLanguage(e: any) {
    handleClose();
    setChoosedLanguage(e.target.innerText);
  }

  function handleSubmitTranslate() {
    if (value) {
      dispatch({
      type: UPDATE_TRANSLATE_TASKS,
      payload: task.id
    });
      setValue("")
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
            {task?.sentence}
          </p>
        </div>

        <Divider />
        <div style={{ marginTop: "1rem" }} className={Styles.cardContent}>
          <strong>Language:</strong>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            {choosedLanguage}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem value="Turkish" onClick={handleChooseLanguage}>
              Turkish
            </MenuItem>
            <MenuItem value="Russian" onClick={handleChooseLanguage}>
              Russian
            </MenuItem>
          </Menu>
        </div>
        <TextField margin="dense" multiline={true} variant="outlined" value={value} onChange={handleOnChangeValue} />
        <div className={Styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={Styles.button}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={Styles.button}
            onClick={handleSubmitTranslate}
          >
            Submit
          </Button>
        </div>
      </Card>
    </>
  );
}
