import React, { useState } from "react";
import "./EdgeModalForm.css";
import "./NodeForm.css";
import { TextField } from "@fluentui/react/lib/TextField";
import { motion } from "framer-motion";

const EdgeModalForm = ({ onAddEdge, setEdgeOpenFormModal }) => {
  const edgeFormAcceptHandler = () => {
    setEdgeOpenFormModal(false);
    onAddEdge(text, description);
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
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setEdgeOpenFormModal(false);
            }}
          >
            ❌
          </button>
        </div>
        <div className="heading-container">
          <span
            className="icon-container"
            // style={{ color: nodeBackgroundColor }}
          >
            {/* {nodeIcon} */}
          </span>
          <span
            className="text-container"
            // style={{ boxShadow: `2px 2px 10px ${nodeBackgroundColor}` }}
          >
            {/* <i>{nodeName}</i> */}
            This is edge modal
          </span>
        </div>
        <div
          className="body"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            label="Edge Name"
            placeholder="Enter the edge name"
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
            label="Description of the node"
            onChange={onChangeHandlerDescription}
            value={description}
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
                setEdgeOpenFormModal(false);
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
              onClick={edgeFormAcceptHandler}
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

export default EdgeModalForm;
