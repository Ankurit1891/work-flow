import React, { useState } from "react";

import { useId } from "@fluentui/react-hooks";

import { TextField } from "@fluentui/react/lib/TextField";
import {
  makeStyles,
  getTheme,
  initializeIcons,
  mergeStyleSets,
  FontWeights,
  Modal,
} from "@fluentui/react";
import {
  DefaultButton,
  PrimaryButton,
  IconButton,
} from "@fluentui/react/lib/Button";

const NodeFormModal = ({ nodeData, setOpenModal, alterNode }) => {
  const nodeFormAcceptHandler = () => {
    setOpenModal(false);
    alterNode(text, description);
    console.log(nodeData.icon);
  };
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const onChangeHandlerName = (e) => {
    setText(e.target.value);
  };
  const onChangeHandlerDescription = (e) => {
    setDescription(e.target.value);
  };

  const buttonClasses = buttonStyles();
  const inputClasses = useStyles();

  initializeIcons();
  const titleId = useId("title");

  return (
    <div>
      <Modal
        titleAriaId={titleId}
        isOpen={true}
        onDismiss={() => {
          setOpenModal(false);
        }}
        isBlocking={false}
        containerClassName={contentStyles.container}
      >
        <div className={contentStyles.header}>
          <h2 className={contentStyles.heading} id={titleId}>
            State
          </h2>
          <IconButton
            styles={iconButtonStyles}
            iconProps={{ iconName: "Cancel" }}
            title="Cancel"
            ariaLabel="Cancel"
            onClick={() => {
              setOpenModal(false);
            }}
          />
        </div>
        <div className={contentStyles.body}>
          <TextField
            onChange={onChangeHandlerName}
            value={text}
            className={inputClasses.stateName}
            label="State Name"
            style={{
              fontWeight: "400",
            }}
            placeholder="Enter state name  here"
          />
          <TextField
            onChange={onChangeHandlerDescription}
            value={description}
            className={inputClasses.stateDescription}
            label="State Description"
            placeholder="Enter state description  here"
          />
        </div>
        <div
          style={{ display: "flex", padding: "20px", justifyContent: "end" }}
        >
          <DefaultButton
            className={buttonClasses.cancel}
            text="CANCEL"
            onClick={() => {
              setOpenModal(false);
            }}
            allowDisabledFocus
          />
          <PrimaryButton
            className={buttonClasses.confirm}
            text="CONFIRM"
            onClick={nodeFormAcceptHandler}
            allowDisabledFocus
          />
        </div>
      </Modal>
    </div>
  );
};

const useStyles = makeStyles({
  stateName: {
    width: "200px",
  },
  stateDescription: {
    width: "400px",
  },
});

const buttonStyles = makeStyles({
  confirm: {
    color: "#ffffff",
    backgroundColor: "#0a8cfa",
    marginLeft: "9px",
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "green", // Change the background color on hover to dark blue
      color: "white", // Change the text color on hover to white
    },
  },
  cancel: {
    backgroundColor: "white",
    color: "black",
    marginLeft: "9px",
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "red", // Change the background color on hover to dark blue
      color: "white", // Change the text color on hover to white
    },
  },
});

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    width: "50%",
    fontSize: "27px ",
  },
  header: [
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.purpleDark}`,
      color: theme.palette.black,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  heading: {
    color: "black",
    fontWeight: FontWeights.semibold,
    fontSize: "inherit",
    margin: "0",
  },
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
});

const iconButtonStyles = {
  root: {
    color: "black",
    fontWeight: "100",
    backgroundColor: "white",
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
    "&:hover": {
      backgroundColor: "grey",
      color: "black",
    },
  },
};
export default NodeFormModal;
