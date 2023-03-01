import React, { useState } from "react";
import "./Modal.css";
import { TextField } from "@fluentui/react/lib/TextField";
import { motion } from "framer-motion";
function Modal({ node, setOpenModal, alterNode }) {
  const nodeFormAcceptHandler = () => {
    setOpenModal(false);
    alterNode(text, description, node.id);
  };
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const onChangeHandlerName = (e) => {
    setText(e.target.value);
  };
  const onChangeHandlerDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="modalBackground">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="modalContainer"
      >
        <div className="titleCloseBtn">
          <motion.button
            initial={{
              rotate: 0,
            }}
            whileHover={{
              rotate: +90,
            }}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            ❌
          </motion.button>
        </div>
        <div className="title">
          <h1>State</h1>
        </div>
        <div
          className="body"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            label="State   Name"
            placeholder="Enter the State name"
            onChange={onChangeHandlerName}
            value={text}
          />
          <br />
          <TextField
            placeholder="Description..."
            style={{
              width: "fit-content",
              minWidth: "400px",
              minHeight: "70px",
            }}
            label="Description of the state"
            onChange={onChangeHandlerDescription}
            value={description}
            multiline
            autoAdjustHeight
          />
        </div>
        <div className="footer">
          <motion.button
            initial={{
              rotate: 0,
            }}
            transition={{ duration: 0.1 }}
            whileHover={{
              backgroundColor: "#000000",
              scale: 1.1,
            }}
            onClick={() => {
              setOpenModal(false);
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
      </motion.div>
    </div>
  );
}

export default Modal;
