import React, { useState } from "react";
import "./EdgeModalForm.css";
import "./NodeForm.css";
import { TextField } from "@fluentui/react/lib/TextField";
import { motion } from "framer-motion";

const EdgeModalForm = ({ edge, setEdgeOpenFormModal, alterEdge }) => {
  const edgeFormAcceptHandler = () => {
    setEdgeOpenFormModal(false);
    alterEdge(text, description, edge.id);
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
        className="modalContainer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
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
              setEdgeOpenFormModal(false);
            }}
          >
            ❌
          </motion.button>
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
            Edge
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
      </motion.div>
    </div>
  );
};

export default EdgeModalForm;
