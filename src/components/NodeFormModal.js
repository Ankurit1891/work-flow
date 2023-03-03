import React, { useState } from "react";

import { useId } from "@fluentui/react-hooks";
import { Label } from "@fluentui/react-components";

import { TextField } from "@fluentui/react/lib/TextField";
import {
  makeStyles,
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

const NodeFormModal = ({ nodeData, setOpenModal, alterNode, theme, name }) => {
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
  const labelStyle = {
    marginTop: "10px",
    fontSize: "14px",
    fontWeight: "600",
    color: theme ? "rgb(50, 49, 48)" : "#e2d6d6",
    boxSizing: " border - box",
    boxShadow: "none",
    margin: "0px",
    display: "inline - block",
    padding: "5px 0px",
    overflowWrap: "break-word",
  };
  const contentStyles = mergeStyleSets({
    container: {
      borderTop: theme ? `4px solid #26024a` : "4px solid #0a8cfa",
      borderLeft: "1px solid grey",
      boxShadow: theme ? "5px 5px 5px #313233" : "5px 5px 5px grey",
      display: "flex",
      flexFlow: "column nowrap",
      alignItems: "stretch",
      width: "50%",
      fontSize: "27px ",
    },
    header: [
      {
        display: "flex",
        color: "#0d0d0d",
        justifyContent: "space-between",
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
      // borderLeft: "1px solid grey",
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

  // const iconButtonStyles = {
  //   root: {
  //     color: "black",
  //     fontWeight: "100",
  //     backgroundColor: "white",
  //     marginLeft: "auto",
  //     marginTop: "4px",
  //     marginRight: "2px",
  //     "&:hover": {
  //       backgroundColor: "grey",
  //       color: "black",
  //     },
  //   },
  // };
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
        <div
          className={contentStyles.header}
          style={{ backgroundColor: theme ? "white" : "#1d1c1c" }}
        >
          <h2
            className={contentStyles.heading}
            id={titleId}
            style={{ color: theme ? "black" : "white" }}
          >
            State : {name}
          </h2>
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            title="Close"
            ariaLabel="Close"
            style={{
              backgroundColor: theme ? "white" : "#1d1c1c",
              color: theme ? "black" : "white",
              "&:hover": { backgroundColor: "grey" },
            }}
            onClick={() => {
              setOpenModal(false);
            }}
          />
          {/* <IconButton
            styles={iconButtonStyles.root}
            iconProps={{ iconName: "Cancel" }}
            title="Cancel"
            ariaLabel="Cancel"
            onClick={() => {
              setOpenModal(false);
            }}
          /> */}
        </div>
        <div
          className={contentStyles.body}
          style={{ backgroundColor: theme ? "white" : "#1d1c1c" }}
        >
          <Label style={labelStyle}>State Name</Label>
          <TextField
            onChange={onChangeHandlerName}
            value={text}
            className={inputClasses.stateName}
            style={{
              fontWeight: "400",
              backgroundColor: theme ? "whitesmoke" : "#1d1c1c",
              color: theme ? "black" : "white",
            }}
            placeholder="Enter state name  here"
          />
          <Label style={labelStyle}>State Description</Label>

          <TextField
            onChange={onChangeHandlerDescription}
            value={description}
            style={{
              fontWeight: "400",
              backgroundColor: theme ? "whitesmoke" : "#1d1c1c",
              color: theme ? "black" : "white",
              // border: "2px solid blue",
            }}
            className={inputClasses.stateDescription}
            placeholder="Enter state description  here"
          />
        </div>
        <div
          style={{
            display: "flex",
            padding: "20px",
            justifyContent: "end",
            backgroundColor: theme ? "white" : "#1d1c1c",
          }}
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

// const theme = getTheme();

export default NodeFormModal;
