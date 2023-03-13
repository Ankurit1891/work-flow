import { motion } from "framer-motion";
import { Input } from "./Input";
import event_code from "../api_data/event_code";
import React, { useState, useEffect } from "react";
// import { TextField } from "@fluentui/react/lib/TextField";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import { AddCircle24Filled } from "@fluentui/react-icons";

import {
  makeStyles,
  mergeStyleSets,
  FontWeights,
  Modal,
  Stack,
  initializeIcons,
  Icon,
} from "@fluentui/react";
import {
  DefaultButton,
  IconButton,
  PrimaryButton,
} from "@fluentui/react/lib/Button";
import { useForm } from "react-hook-form";

const EdgeModalForm = ({ edge, setEdgeOpenFormModal, alterEdge, theme }) => {
  const {
    handleSubmit,
    watch,
    control,
    formState: {},
  } = useForm({
    mode: "all",
  });
  const [counter, setcounter] = useState([]);

  const formCheckError = (text) => {
    let value = {};
    if (text.length === 0) {
      value = { val: 1, message: "Enter a valid text" };
      return value;
    } else if (text.length > 0 && text.length < 3) {
      value = { val: 2, message: "Minimun length should be 3" };
      return value;
    } else {
      value = { val: 3, message: "" };
      return value;
    }
  };
  const edgeFormAcceptHandler = () => {
    console.log(
      `Transition name =>${transitionName}pre trans => ${preTransitionValue} , post trans => ${postTransitionValue} , conditional state value => ${conditionalNextStateValue} , system event code => ${onChangeSystemEventCode}`
    );
    setDescription("Dummy Data");
    console.log(
      `pre trans value=> ${postTransitionValueData} , post trans value=> ${preTransitionValueData} , conditional state value => ${conditionalNextStateValueData} , system event code => ${onChangeSystemEventCode}`
    );
    setEdgeOpenFormModal(false);
    alterEdge(transitionName, description, edge.id);
  };

  // transtion value data 2ns drop down
  const [postTransitionValueData, setpostTransitionValueData] = useState();
  const [preTransitionValueData, setPreTransitionValueData] = useState();
  const [conditionalNextStateValueData, setConditionalNextStateValueData] =
    useState();

  // system event code data value
  const [onChangeSystemEventCode, setOnChangeSystemEventCode] = useState();

  // post transitional values 1st drop down
  const [postTransitionValue, setpostTransitionValue] = useState();
  const [preTransitionValue, setPreTransitionValue] = useState();
  const [conditionalNextStateValue, setConditionalNextStateValue] = useState();

  // show button (additional)
  const [showButton, setshowButton] = useState(true);

  // name error
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  //edge name
  const [text, setText] = useState("");

  // edge description (not required)
  const [description, setDescription] = useState("");

  // drop down system event code data
  const [systemCodeData, setSystemCodeData] = useState([]);

  //transition data dor 2ns drop down
  const [preTransitionDropDownData, setPreTransitionDropDownData] = useState();
  const [postTransitionDropDownData, setPostTransitionDropDownData] =
    useState();

  // on name change handler
  const onChangeHandlerName = (e) => {
    setText(e.target.value);
    if (e.target.value.length >= 3) {
      setNameErrorMessage("");
    }
  };
  const transitionName = watch("transitionName");
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
      borderTop: theme ? `4px solid #0a8cfa` : "4px solid #0a8cfa",
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
        flexDirection: "row",
        justifyContent: "space-between",
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

  // api call for system event codes
  useEffect(() => {
    fetch("/api/event_code")
      .then((res) => res.json())
      .then((json) => {
        setSystemCodeData(json.codes);
      });
  }, []);

  const dropdownStyles = {
    root: {},
    dropdown: {
      width: "300px",
      marginRight: "10px",
    },
    dropdownItem: {
      "&:hover": {
        border: "0.1px solid grey",
      },
    },
  };

  const preTransitionData = [
    { id: 1, key: "api_call", text: "API Call" },
    { id: 2, key: "alert", text: "Alert" },
    { id: 3, key: "hooks", text: "Hook" },
    { id: 4, key: "limit_utilization", text: "Limit Utilization" },
  ];

  const postTransitionData = [
    { id: 1, key: "api_call", text: "API Call" },
    { id: 2, key: "alert", text: "Alert" },
    { id: 3, key: "hooks", text: "Hook" },
    { id: 4, key: "limit_utilization", text: "Limit Utilization" },
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

  // on change pre transition handler 1st drop down
  const onChangePreTransitionHandler = (e, option) => {
    let text = option.text;
    let key = option.key;

    const url = `/api/pre_transcition_action/${key}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setPreTransitionDropDownData(json.data);
      });
    setPreTransitionValue(() => option.text);
  };

  // on change post transition handler 1st drop down
  const onChangePostTransitionHandler = (e, option) => {
    let text = option.text;
    let key = option.key;

    const url = `/api/post_transcition_action/${key}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setPostTransitionDropDownData(json.data);
      });
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
  initializeIcons();

  const methods = useForm();
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
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            title="Close"
            ariaLabel="Close"
            onClick={() => {
              setEdgeOpenFormModal(false);
            }}
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit((data) => {
              edgeFormAcceptHandler();
            })();
          }}
        >
          <div className={contentStyles.body}>
            <div>
              {/* <TextField
                {...methods.register("Transition_name", {
                  minLength: { value: 3, message: "Min Length is 3" },
                })}
                onChange={onChangeHandlerName}
                // value={text}
                className={inputClasses.stateName}
                label="Transition Name"
                style={{
                  fontWeight: "400",
                }}
                placeholder="Enter transition name  here"
              /> */}
              <Input
                style={{ width: "300px" }}
                control={control}
                name={"transitionName"}
                label="Transition Name"
                rules={{
                  required: "This is required",
                  minLength: { value: 3, message: "Minimun value is 3" },
                  maxLength: { value: 10, message: "Maximum val is 10" },
                }}
                placeholder="Enter transition name  here"
              />
              <Dropdown
                {...methods.register("system_event_code")}
                // required={true}
                // onChange={onChangeSystemEventCodeHandler}
                label="System Event Code"
                placeholder="Select an option"
                options={systemCodeData}
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
                      {...methods.register("Pre_Transition_Action")}
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
                            {...methods.register(`${preTransitionValue}_Data`)}
                            label={`${preTransitionValue} Data`}
                            onChange={onChangePreTransitionDataHandler}
                            placeholder="Select an option"
                            options={preTransitionDropDownData}
                            styles={dropdownStyles}
                          />
                        </div>
                      </div>
                    )}
                    <Icon
                      iconName="StatusErrorFull"
                      styles={{
                        root: {
                          fontSize: "20px",
                          color: theme ? "black" : "red",
                        },
                      }}
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
                      {...methods.register("Post_Transition_Action")}
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
                            {...methods.register(`${postTransitionValue} Data`)}
                            onChange={onChangePostTransitionDataHandler}
                            placeholder="Select an option"
                            options={postTransitionDropDownData}
                            styles={dropdownStyles}
                          />
                        </div>
                      </div>
                    )}
                    <Icon
                      iconName="StatusErrorFull"
                      styles={{
                        root: {
                          fontSize: "20px",
                          color: theme ? "black" : "red",
                        },
                      }}
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
                      {...methods.register("Conditional_Next_State")}
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
                            {...methods.register(
                              `${conditionalNextStateValue} Data`
                            )}
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
                      styles={{
                        root: {
                          fontSize: "20px",
                          color: theme ? "black" : "red",
                        },
                      }}
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
          <div>
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
                type="submit"
                text="CONFIRM"
                // onClick={edgeFormAcceptHandler}
                allowDisabledFocus
              />
            </Stack>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default EdgeModalForm;
