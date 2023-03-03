import { motion } from "framer-motion";
import { Label } from "@fluentui/react-components";
import React, { useState } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import { AddCircle24Filled } from "@fluentui/react-icons";
import { DismissCircle24Filled } from "@fluentui/react-icons";

import {
  makeStyles,
  getTheme,
  mergeStyleSets,
  FontWeights,
  Modal,
} from "@fluentui/react";
import {
  DefaultButton,
  PrimaryButton,
  IconButton,
} from "@fluentui/react/lib/Button";

const EdgeModalForm = ({ edge, setEdgeOpenFormModal, alterEdge, theme }) => {
  const [counter, setcounter] = useState([]);
  const edgeFormAcceptHandler = () => {
    console.log(
      `pre trans => ${preTransitionValue} , post trans => ${postTransitionValue} , conditional state value => ${conditionalNextStateValue} , system event code => ${onChangeSystemEventCode}`
    );
    setEdgeOpenFormModal(false);
    alterEdge(text, description, edge.id);
  };
  const [postTransitionValueData, setpostTransitionValueData] = useState();
  const [preTransitionValueData, setPreTransitionValueData] = useState();
  const [conditionalNextStateValueData, setConditionalNextStateValueData] =
    useState();

  const [onChangeSystemEventCode, setOnChangeSystemEventCode] = useState();
  const [postTransitionValue, setpostTransitionValue] = useState();
  const [preTransitionValue, setPreTransitionValue] = useState();
  const [conditionalNextStateValue, setConditionalNextStateValue] = useState();

  const [showButton, setshowButton] = useState(true);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const onChangeHandlerName = (e) => {
    setText(e.target.value);
  };
  const light = "white";
  const dark = "#1d1c1c";

  const useStyles = makeStyles({
    stateName: {
      width: "300px",
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

  const contentStyles = mergeStyleSets({
    container: {
      boxShadow: theme ? "5px 5px 5px #313233" : "5px 5px 5px grey",
      borderTop: theme ? `4px solid #26024a` : "4px solid #0a8cfa",
      borderLeft: "1px solid grey",
      display: "flex",
      flexFlow: "column nowrap",
      alignItems: "stretch",
      width: "50%",
      fontSize: "27px ",
    },
    header: [
      {
        flex: "1 1 auto",
        color: "#0d0d0d",
        display: "flex",
        alignItems: "center",
        fontWeight: FontWeights.semibold,
        padding: "12px 12px 14px 24px",
      },
    ],
    heading: {
      // color: theme ? "black" : "white",
      fontWeight: FontWeights.semibold,
      fontSize: "inherit",
      margin: "0",
    },
    body: {
      display: "block",
      flexDirection: "row",
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
      color: theme ? "black" : "white",
      fontWeight: "100",
      backgroundColor: theme ? "white" : "#1d1c1c",
      marginLeft: "auto",
      marginTop: "4px",
      marginRight: "2px",
      "&:hover": {
        backgroundColor: "blue",
        color: "black",
      },
    },
  };
  const dropdownStyles = {
    root: {
      color: theme ? "white" : "#1d1c1c",
    },
    dropdown: {
      width: "300px",
      marginRight: "10px",
      color: theme ? "black" : "white",
      "&:hover": {
        backgroundColor: theme ? "white" : "#1d1c1c",
      },
    },
    title: {
      backgroundColor: theme ? "white" : "#1d1c1c",
      color: theme ? "black" : "white",
      "&:hover": {
        backgroundColor: theme ? "white" : "#1d1c1c",
      },
    },
    dropdownItem: {
      backgroundColor: theme ? "white" : "#1d1c1c",
      color: theme ? "black" : "#909192",
      "&:hover": {
        backgroundColor: theme ? "white" : "#1d1c1c",
        color: theme ? "black" : "white",
        border: "1px solid grey",
      },
    },
  };
  const options = [
    { key: "CODE1", text: "Code 1" },
    { key: "CODE2", text: "Code 2" },
    { key: "CODE3", text: "Code 3" },
    { key: "CODE4", text: "Code 4" },
  ];

  const preTransitionData = [
    { key: "101", text: "API Call" },
    { key: "102", text: "Alert" },
    { key: "103", text: "Hook" },
    { key: "104", text: "Limit Utilization" },
  ];

  const postTransitionData = [
    { key: "101", text: "API Call" },
    { key: "102", text: "Alert" },
    { key: "103", text: "Hook" },
    { key: "104", text: "Limit Utilization" },
  ];

  const conditionalNextState = [
    { key: "201", text: "Dynamic Formula" },
    { key: "202", text: "Limit Check" },
    { key: "203", text: "Hook" },
  ];

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
  const motionDivStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: " flex-start",
    marginTop: "10px",
  };

  const buttonClasses = buttonStyles();
  const inputClasses = useStyles();

  const onChangeSystemEventCodeHandler = (e, option) => {
    setOnChangeSystemEventCode(option.text);
  };
  const onChangeConditionalNextStateHandler = (e, option) => {
    setConditionalNextStateValue(() => option.text);
  };
  const onChangePreTransitionHandler = (e, option) => {
    setPreTransitionValue(() => option.text);
  };
  const onChangePostTransitionHandler = (e, option) => {
    setpostTransitionValue(() => option.text);
  };

  const onChangeConditionalNextStateDataHandler = (e, option) => {
    setConditionalNextStateValueData(() => option.text);
  };
  const onChangePreTransitionDataHandler = (e, option) => {
    setPreTransitionValueData(() => option.text);
  };
  const onChangePostTransitionDataHandler = (e, option) => {
    setpostTransitionValueData(() => option.text);
  };
  return (
    <motion.div>
      <Modal
        isOpen={true}
        onDismiss={() => {
          setEdgeOpenFormModal(false);
        }}
        isBlocking={false}
        containerClassName={contentStyles.container}
      >
        <div
          className={contentStyles.header}
          style={{ backgroundColor: theme ? light : dark }}
        >
          <h2
            className={contentStyles.heading}
            style={{ color: theme ? dark : light }}
          >
            TRANSITION
          </h2>
          {/* cross button */}
          <IconButton
            styles={iconButtonStyles}
            iconProps={{ iconName: "Cancel" }}
            title="Cancel"
            ariaLabel="Cancel"
            onClick={() => {
              setEdgeOpenFormModal(false);
            }}
          />
        </div>
        <div
          className={contentStyles.body}
          style={{ backgroundColor: theme ? light : dark }}
        >
          <div>
            <Label style={labelStyle}>Transition Name</Label>
            <TextField
              onChange={onChangeHandlerName}
              value={text}
              className={inputClasses.stateName}
              style={{
                fontWeight: "400",
                backgroundColor: theme ? light : "#1d1c1c",
                color: theme ? "black" : "white",
              }}
              placeholder="Enter transition name  here"
            />
            <Label style={labelStyle}>System Event Code</Label>
            <Dropdown
              onChange={onChangeSystemEventCodeHandler}
              placeholder="Select an option"
              options={options}
              styles={dropdownStyles}
            />
          </div>
          <div>
            {counter.length > 0 && counter.includes(1) && (
              <motion.div
                style={motionDivStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
              >
                {/* comment  Pre transition action  */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Label style={labelStyle}>Pre-Transition Action</Label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Dropdown
                      onChange={onChangePreTransitionHandler}
                      placeholder="Select an option"
                      options={preTransitionData}
                      styles={dropdownStyles}
                    />
                    <DismissCircle24Filled
                      primaryFill="#a90101"
                      onClick={() => {
                        setPreTransitionValue();
                        setPreTransitionValueData();
                        if (counter.length === 1) {
                          setshowButton(true);
                          setcounter([]);
                        } else if (counter.length === 2) {
                          if (counter.includes(2)) {
                            setshowButton(true);
                            setcounter([2]);
                          } else if (counter.includes(3)) {
                            setshowButton(true);
                            setcounter([3]);
                          }
                        } else if (counter.length === 3) {
                          setshowButton(true);
                          setcounter([2, 3]);
                        }
                      }}
                    />
                  </div>
                </div>
                {preTransitionValue && (
                  <div style={{ marginTop: "-10px", marginLeft: "35px" }}>
                    <Label style={labelStyle}>{preTransitionValue} Data</Label>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Dropdown
                        onChange={onChangePreTransitionDataHandler}
                        placeholder="Select an option"
                        options={preTransitionData}
                        styles={dropdownStyles}
                      />
                      {/* <DismissCircle24Filled
                        primaryFill="#a90101"
                        onClick={() => {
                          if (counter.length === 1) {
                            setshowButton(true);
                            setcounter([]);
                          } else if (counter.length === 2) {
                            if (counter.includes(2)) {
                              setshowButton(true);
                              setcounter([2]);
                            } else if (counter.includes(3)) {
                              setshowButton(true);
                              setcounter([3]);
                            }
                          } else if (counter.length === 3) {
                            setshowButton(true);
                            setcounter([2, 3]);
                          }
                        }}
                      /> */}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            {counter.length > 0 && counter.includes(2) && (
              <motion.div
                style={motionDivStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
              >
                {/*comment  postTransition action */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Label style={labelStyle}>Post-Transition Action</Label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Dropdown
                      onChange={onChangePostTransitionHandler}
                      placeholder="Select an option"
                      options={postTransitionData}
                      styles={dropdownStyles}
                    />
                    <DismissCircle24Filled
                      primaryFill="#a90101"
                      onClick={() => {
                        setpostTransitionValue();
                        setpostTransitionValueData();
                        if (counter.length === 1) {
                          setshowButton(true);
                          setcounter([]);
                        } else if (counter.length === 2) {
                          if (counter.includes(1)) {
                            setshowButton(true);
                            setcounter([1]);
                          } else if (counter.includes(3)) {
                            setshowButton(true);
                            setcounter([3]);
                          }
                        } else if (counter.length === 3) {
                          setshowButton(true);
                          setcounter([1, 3]);
                        }
                      }}
                    />
                  </div>
                </div>
                {postTransitionValue && (
                  <div style={{ marginTop: "-10px", marginLeft: "35px" }}>
                    <Label style={labelStyle}>{postTransitionValue} Data</Label>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Dropdown
                        onChange={onChangePostTransitionDataHandler}
                        placeholder="Select an option"
                        options={preTransitionData}
                        styles={dropdownStyles}
                      />
                      {/* <DismissCircle24Filled
                        primaryFill="#a90101"
                        onClick={() => {
                          if (counter.length === 1) {
                            setshowButton(true);
                            setcounter([]);
                          } else if (counter.length === 2) {
                            if (counter.includes(2)) {
                              setshowButton(true);
                              setcounter([2]);
                            } else if (counter.includes(3)) {
                              setshowButton(true);
                              setcounter([3]);
                            }
                          } else if (counter.length === 3) {
                            setshowButton(true);
                            setcounter([2, 3]);
                          }
                        }}
                      /> */}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            {counter.length > 0 && counter.includes(3) && (
              <motion.div
                style={motionDivStyle}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Label style={labelStyle}>Conditional Next State</Label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Dropdown
                      onChange={onChangeConditionalNextStateHandler}
                      placeholder="Select an option"
                      options={conditionalNextState}
                      styles={dropdownStyles}
                    />
                    <DismissCircle24Filled
                      primaryFill="#a90101"
                      onClick={() => {
                        setConditionalNextStateValue();
                        setConditionalNextStateValueData();
                        if (counter.length === 1) {
                          setshowButton(true);
                          setcounter([]);
                        } else if (counter.length === 2) {
                          if (counter.includes(1)) {
                            setshowButton(true);
                            setcounter([1]);
                          } else if (counter.includes(2)) {
                            setshowButton(true);
                            setcounter([2]);
                          }
                        } else if (counter.length === 3) {
                          setshowButton(true);
                          setcounter([1, 2]);
                        }
                      }}
                    />
                  </div>
                </div>
                {conditionalNextStateValue && (
                  <div style={{ marginTop: "-10px", marginLeft: "35px" }}>
                    <Label style={labelStyle}>
                      {conditionalNextStateValue} Data
                    </Label>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Dropdown
                        onChange={onChangeConditionalNextStateDataHandler}
                        placeholder="Select an option"
                        options={preTransitionData}
                        styles={dropdownStyles}
                      />
                      {/* <DismissCircle24Filled
                        filled="white"
                        primaryFill="#a90101"
                        onClick={() => {
                          if (counter.length === 1) {
                            setshowButton(true);
                            setcounter([]);
                          } else if (counter.length === 2) {
                            if (counter.includes(2)) {
                              setshowButton(true);
                              setcounter([2]);
                            } else if (counter.includes(3)) {
                              setshowButton(true);
                              setcounter([3]);
                            }
                          } else if (counter.length === 3) {
                            setshowButton(true);
                            setcounter([2, 3]);
                          }
                        }}
                      /> */}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            {showButton && (
              <span
                style={{
                  fontSize: "15px",
                  marginLeft: "0px",
                  marginRight: "10px",
                  color: theme ? "black" : "#e2d6d6",
                }}
              >
                <i>Add additional info</i>
              </span>
            )}
            {showButton && (
              <AddCircle24Filled
                primaryFill="#0a8cfa"
                onClick={() => {
                  if (counter.length === 0) {
                    setcounter([1]);
                  } else if (counter.length === 1) {
                    if (counter.includes(1)) {
                      setcounter([1, 2]);
                    } else if (counter.includes(2)) {
                      setcounter([1, 2]);
                    } else if (counter.includes(3)) {
                      setcounter([1, 3]);
                    }
                  } else if (counter.length === 2) {
                    setshowButton(false);
                    setcounter([1, 2, 3]);
                    // if (counter.includes(1) && counter.includes(2)) {
                    //   setshowButton(false);
                    //   setcounter([1, 2, 3]);
                    // }
                    // if (counter.includes(1) && counter.includes(3)) {
                    //   setshowButton(false);
                    //   setcounter([1, 2, 3]);
                    // }
                    // if (counter.includes(2) && counter.includes(3)) {
                    //   setshowButton(false);
                    //   setcounter([1, 2, 3]);
                    // }
                  }
                }}
              />
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "20px",
            justifyContent: "end",
            backgroundColor: theme ? light : dark,
          }}
        >
          <DefaultButton
            className={buttonClasses.cancel}
            text="CANCEL"
            onClick={() => {
              setEdgeOpenFormModal(false);
            }}
            allowDisabledFocus
          />
          <PrimaryButton
            className={buttonClasses.confirm}
            text="CONFIRM"
            onClick={edgeFormAcceptHandler}
            allowDisabledFocus
          />
        </div>
      </Modal>
    </motion.div>
  );
};

export default EdgeModalForm;
