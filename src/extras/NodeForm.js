import React, { useState } from "react";
import "./Modal.css";
import "./NodeForm.css";
import { TextField } from "@fluentui/react/lib/TextField";
import { motion } from "framer-motion";

const NodeForm = ({
  onAddNode,
  setOpenFormModal,
  nodeName,
  nodeIcon,
  nodeBackgroundColor,
}) => {
  const nodeFormAcceptHandler = () => {
    setOpenFormModal(false);
    onAddNode(text);
  };

  const [text, setText] = useState("");
  const onChangeHandler = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <motion.button
            initial={{
              rotate: 0,
            }}
            whileHover={{
              rotate: +90,
            }}
            onClick={() => {
              setOpenFormModal(false);
            }}
          >
            ❌
          </motion.button>
        </div>
        <div className="heading-container">
          <span
            className="icon-container"
            style={{ color: nodeBackgroundColor }}
          >
            {nodeIcon}
          </span>
          <span
            className="text-container"
            // style={{ boxShadow: `2px 2px 10px ${nodeBackgroundColor}` }}
          >
            <i>{nodeName}</i>
          </span>
        </div>
        <div
          className="body"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            style={{
              width: "fit-content",
              minWidth: "400px",
              minHeight: "70px",
            }}
            label="Description of the node"
            onChange={onChangeHandler}
            value={text}
            multiline
            autoAdjustHeight
          />
          <div className="footer">
            <motion.button
              initial={{
                rotate: 0,
              }}
              transition={{ duration: 0.1 }}
              whileHover={{
                backgroundColor: "#0a0a0a",
                scale: 1.1,
              }}
              onClick={() => {
                setOpenFormModal(false);
              }}
              id="cancelBtn"
            >
              Close
            </motion.button>
            <motion.button
              initial={{
                rotate: 0,
              }}
              transition={{ duration: 0.1 }}
              whileHover={{
                backgroundColor: "#0a0a0a",
                scale: 1.1,
              }}
              onClick={nodeFormAcceptHandler}
              id="acceptBtn"
            >
              Confirm
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeForm;
