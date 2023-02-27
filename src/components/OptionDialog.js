import React from "react";
import { motion } from "framer-motion";

import "./OptionDialog.css";
const OptionDialog = (props) => {
  const onClickHandler = () => {
    props.setOpenDialog(false);
    props.AddNode();
  };

  return (
    <div className="main-box" style={{ top: props.xCords, left: props.yCords }}>
      <ul className="list-class">
        <motion.li
          whileHover={{
            scale: 1.1,
            originX: 0,
            color: "white",
            fontWeight: "400",
          }}
          className="list-title"
          onClick={onClickHandler}
        >
          Add Node
        </motion.li>
        <hr />
        <motion.li
          whileHover={{
            scale: 1.1,
            originX: 0,
            color: "white",
            fontWeight: "400",
          }}
          className="list-title"
          onClick={() => {
            props.setOpenDialog(false);
          }}
        >
          2nd Option...
        </motion.li>
        <hr />
        <motion.li
          whileHover={{
            scale: 1.1,
            originX: 0,
            color: "white",
            fontWeight: "400",
          }}
          className="list-title"
          onClick={() => {
            props.setOpenDialog(false);
          }}
        >
          3rd Option...
        </motion.li>
        <hr />
        <motion.li
          whileHover={{
            scale: 1.1,
            originX: 0,
            color: "white",
            fontWeight: "400",
          }}
          className="list-title"
          onClick={() => {
            props.setOpenDialog(false);
          }}
        >
          4th Option...
        </motion.li>
        <hr />
        <motion.li
          whileHover={{
            scale: 1.1,
            originX: 0,
            color: "white",
            fontWeight: "400",
          }}
          className="list-title"
          onClick={() => {
            props.setOpenDialog(false);
          }}
        >
          5th Option...
        </motion.li>
      </ul>
    </div>
  );
};

export default OptionDialog;
