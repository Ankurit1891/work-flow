import { motion } from "framer-motion";

import React, { useState } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import { AddCircle24Filled } from "@fluentui/react-icons";

import {
  makeStyles,
  mergeStyleSets,
  FontWeights,
  Modal,
  Stack,
  Icon,
} from "@fluentui/react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";

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
      color: theme ? "black" : "white",
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

  const dropdownStyles = {
    root: {},
    dropdown: {
      width: "300px",
      marginRight: "10px",

      "&:hover": {},
    },
    title: {
      "&:hover": {},
    },
    dropdownItem: {
      "&:hover": {
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

  const motionDivStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: " flex-start",
    marginTop: "10px",
  };

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
        <div className={contentStyles.header}>
          <h2
            style={{ color: theme ? dark : light }}
            className={contentStyles.heading}
          >
            TRANSITION
          </h2>
        </div>
        <div className={contentStyles.body}>
          <div>
            <TextField
              onChange={onChangeHandlerName}
              value={text}
              className={inputClasses.stateName}
              label="Transition Name"
              style={{
                fontWeight: "400",
              }}
              placeholder="Enter transition name  here"
            />
            <Dropdown
              onChange={onChangeSystemEventCodeHandler}
              label="System Event Code"
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
                <Stack
                  childrenGap="10"
                  verticalAlign="end"
                  horizontal
                  styles={{ root: {} }}
                >
                  <Dropdown
                    label="Pre-Transition Action"
                    onChange={onChangePreTransitionHandler}
                    placeholder="Select an option"
                    options={preTransitionData}
                    styles={dropdownStyles}
                  />
                  {preTransitionValue && (
                    <div style={{ marginTop: "-10px", marginLeft: "35px" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Dropdown
                          label={`${preTransitionValue} Data`}
                          onChange={onChangePreTransitionDataHandler}
                          placeholder="Select an option"
                          options={preTransitionData}
                          styles={dropdownStyles}
                        />
                      </div>
                    </div>
                  )}
                  <Icon
                    iconName="StatusErrorFull"
                    styles={{ root: { fontSize: "20px" } }}
                    onClick={() => {
                      setPreTransitionValue();
                      setPreTransitionValueData();
                      if (counter.length === 1) {
                        setshowButton(true);
                        setcounter([]);
                      } else if (
                        counter.length === 2 &&
                        (counter.includes(2) || counter.includes(3))
                      ) {
                        setshowButton(true);
                        setcounter(counter.includes(2) ? [2] : [3]);
                      } else if (counter.length === 3) {
                        setshowButton(true);
                        setcounter([2, 3]);
                      }

                      // if (counter.length === 1) {
                      //   setshowButton(true);
                      //   setcounter([]);
                      // } else if (counter.length === 2) {
                      //   if (counter.includes(2)) {
                      //     setshowButton(true);
                      //     setcounter([2]);
                      //   } else if (counter.includes(3)) {
                      //     setshowButton(true);
                      //     setcounter([3]);
                      //   }
                      // } else if (counter.length === 3) {
                      //   setshowButton(true);
                      //   setcounter([2, 3]);
                      // }
                    }}
                  />
                </Stack>
              </motion.div>
            )}
            {counter.length > 0 && counter.includes(2) && (
              <motion.div
                style={motionDivStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
              >
                <Stack
                  childrenGap="10"
                  verticalAlign="end"
                  horizontal
                  styles={{ root: {} }}
                >
                  <Dropdown
                    label="Post-Transition Action"
                    onChange={onChangePostTransitionHandler}
                    placeholder="Select an option"
                    options={postTransitionData}
                    styles={dropdownStyles}
                  />
                  {postTransitionValue && (
                    <div style={{ marginTop: "-10px", marginLeft: "35px" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Dropdown
                          label={`${postTransitionValue} Data`}
                          onChange={onChangePostTransitionDataHandler}
                          placeholder="Select an option"
                          options={preTransitionData}
                          styles={dropdownStyles}
                        />
                      </div>
                    </div>
                  )}
                  <Icon
                    iconName="StatusErrorFull"
                    styles={{ root: { fontSize: "20px" } }}
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
                </Stack>
              </motion.div>
            )}
            {counter.length > 0 && counter.includes(3) && (
              <motion.div
                style={motionDivStyle}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
              >
                <Stack
                  childrenGap="10"
                  verticalAlign="end"
                  horizontal
                  styles={{ root: {} }}
                >
                  <Dropdown
                    onChange={onChangeConditionalNextStateHandler}
                    label="Conditional Next State"
                    placeholder="Select an option"
                    options={conditionalNextState}
                    styles={dropdownStyles}
                  />
                  {conditionalNextStateValue && (
                    <div style={{ marginTop: "-10px", marginLeft: "35px" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Dropdown
                          label={`${conditionalNextStateValue} Data`}
                          onChange={onChangeConditionalNextStateDataHandler}
                          placeholder="Select an option"
                          options={preTransitionData}
                          styles={dropdownStyles}
                        />
                      </div>
                    </div>
                  )}
                  <Icon
                    iconName="StatusErrorFull"
                    styles={{ root: { fontSize: "20px" } }}
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
                </Stack>
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
                  }
                }}
              />
            )}
          </div>
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
              setEdgeOpenFormModal(false);
            }}
            allowDisabledFocus
          />
          <PrimaryButton
            text="CONFIRM"
            onClick={edgeFormAcceptHandler}
            allowDisabledFocus
          />
        </Stack>
      </Modal>
    </motion.div>
  );
};

export default EdgeModalForm;
