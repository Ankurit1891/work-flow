import React from "react";
import { motion } from "framer-motion";
import { VscDebugStart } from "react-icons/vsc";
import { SiMobxstatetree } from "react-icons/si";
import { GoCircleSlash } from "react-icons/go";
import "./OptionDialog.css";
const OptionDialog = (props) => {
  const onAddStartHandler = () => {
    props.setOpenDialog((val) => !val);
    props.assignNodeValues("#656ac6", <VscDebugStart />, "input", "Start");
  };

  const onAddDefaultHandler = () => {
    props.setOpenDialog((val) => !val);
    props.assignNodeValues(
      "#208d7c",
      <SiMobxstatetree />,
      "default",
      "Continuation"
    );
  };

  const onAddTerminateHandler = () => {
    props.setOpenDialog((val) => !val);
    props.assignNodeValues("#000000", <GoCircleSlash />, "output", "Finish");
  };
  return (
    <div
      className="main-box"
      style={{
        top: props.xCords - 50,
        left: props.yCords,
        // backgroundColor: props.theme ? "white" : "#3d3d3f",
        // border: props.theme ? "1px solid white" : "1px solid #3d3d3f",
        // boxShadow: props.theme
        //   ? "1px 1px 4px -1px black"
        //   : "1px 1px 4px -1px #ece5e5",
      }}
    >
      <ul
        className="list-class"
        style={
          {
            // backgroundColor: props.theme ? "white" : "#3d3d3f",
            // border: props.theme ? "1px solid white" : "1px solid #3d3d3f",
          }
        }
      >
        <motion.li
          initial={{ fontWeight: 100 }} // Set initial font weight to 400
          animate={{ fontWeight: 400 }} // Set animate font weight to 700
          transition={{ duration: 0.1 }}
          // style={{ color: props.theme ? "black" : "white" }}
          whileHover={{
            scale: 1.1,
            originX: 0,
            // color: props.theme ? "black" : "white",
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
          // style={{ color: props.theme ? "black" : "white" }}
          whileHover={{
            scale: 1.1,
            originX: 0,
            // color: props.theme ? "black" : "white",
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
          // style={{ color: props.theme ? "black" : "white" }}
          whileHover={{
            scale: 1.1,
            originX: 0,
            // color: props.theme ? "black" : "white",
          }}
          className="list-title"
          onClick={onAddTerminateHandler}
        >
          Add Finish
        </motion.li>
      </ul>
    </div>
  );
};

export default OptionDialog;
