import React from "react";
import { motion } from "framer-motion";

import "./OptionDialog.css";
const OptionDialog = (props) => {
  const onAddDefaultHandler = () => {
    props.setOpenDialog(false);
    props.AddNode("default", "#ff7c7c", "NODE");
  };
  const onAddStartHandler = () => {
    props.setOpenDialog(false);
    props.AddNode("input", "#656ac6", "START");
  };

  const onAddTerminateHandler = () => {
    props.setOpenDialog(false);
    props.AddNode("output", "#000000", "TERMINATE");
  };
  return (
    <div className="main-box" style={{ top: props.xCords, left: props.yCords }}>
      <ul className="list-class">
        <motion.li
          initial={{ fontWeight: 100 }} // Set initial font weight to 400
          animate={{ fontWeight: 400 }} // Set animate font weight to 700
          transition={{ duration: 0.1 }}
          whileHover={{
            scale: 1.1,
            originX: 0,
            color: "#ffffff",
          }}
          className="list-title"
          onClick={onAddStartHandler}
        >
          Add Start
        </motion.li>
        <hr />
        <motion.li
          initial={{ fontWeight: 100 }} // Set initial font weight to 400
          animate={{ fontWeight: 400 }} // Set animate font weight to 700
          transition={{ duration: 0.1 }}
          whileHover={{
            scale: 1.1,
            originX: 0,
            color: "#ffffff",
          }}
          className="list-title"
          onClick={onAddDefaultHandler}
        >
          Add State
        </motion.li>
        <hr />
        <motion.li
          initial={{ fontWeight: 100 }} // Set initial font weight to 400
          animate={{ fontWeight: 400 }} // Set animate font weight to 700
          transition={{ duration: 0.1 }}
          whileHover={{
            scale: 1.1,
            originX: 0,
            color: "#ffffff",
          }}
          className="list-title"
          onClick={onAddTerminateHandler}
        >
          Add Terminate
        </motion.li>
      </ul>
    </div>
  );
};

export default OptionDialog;
