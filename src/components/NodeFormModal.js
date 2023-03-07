import React, { useState } from "react";
import { Label } from "@fluentui/react-components";
import { TextField } from "@fluentui/react/lib/TextField";
import {
  Stack,
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

  const inputClasses = useStyles();
  if (name === "input") {
    name = "Start";
  } else if (name === "default") {
    name = "Continuation";
  } else if (name === "output") {
    name = "Finish";
  }
  initializeIcons();
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
      borderTop: theme ? `4px solid #0a8cfa` : "4px solid #0a8cfa",
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

  return (
    <div>
      <Modal
        isOpen={true}
        onDismiss={() => {
          setOpenModal(false);
        }}
        isBlocking={false}
        containerClassName={contentStyles.container}
      >
        <div className={contentStyles.header}>
          <h2
            className={contentStyles.heading}
            style={{ color: theme ? "black" : "white" }}
          >
            State : {name}
          </h2>
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            title="Close"
            ariaLabel="Close"
            onClick={() => {
              setOpenModal(false);
            }}
          />
        </div>
        <div className={contentStyles.body}>
          <Label style={labelStyle}>State Name</Label>
          <TextField
            onChange={onChangeHandlerName}
            value={text}
            className={inputClasses.stateName}
            style={{
              fontWeight: "400",
            }}
            placeholder="Enter state name  here"
          />

          <TextField
            onChange={onChangeHandlerDescription}
            value={description}
            label="State Description"
            className={inputClasses.stateDescription}
            placeholder="Enter state description  here"
          />
        </div>
        <Stack
          tokens={{ childrenGap: 10 }}
          horizontalAlign="end"
          horizontal
          styles={{ root: { padding: "10px" } }}
        >
          <DefaultButton
            text="CANCEL"
            onClick={() => {
              setOpenModal(false);
            }}
            allowDisabledFocus
          />
          <PrimaryButton
            text="CONFIRM"
            onClick={nodeFormAcceptHandler}
            allowDisabledFocus
          />
        </Stack>
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

export default NodeFormModal;
