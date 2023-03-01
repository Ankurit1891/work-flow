import React, { useState } from "react";
import "../App.css";
import { motion } from "framer-motion";
import FlowChart from "../components/FlowChart";
import RightBar from "../components/RightBar";
import { makeStyles } from "@fluentui/react";
import { Toggle } from "@fluentui/react/lib/Toggle";
import { initialNodes, initialEdges } from "../node_data/NodeData";

const Canvas = (props) => {
  const useRadioStyle = makeStyles({
    radio: {
      display: "flex",
      width: "200px",
      flexDirection: "row",
      fontSize: "10px",
    },
  });
  const radioStyle = useRadioStyle();
  // const [nodes, setNodes] = useState(initialNodes);
  const nodes = initialNodes;
  const [darkTheme, setdarkTheme] = useState(true);
  const [open, setOpen] = useState("true");

  const [xx, setxx] = useState(null);
  const [yy, setyy] = useState(null);
  const [height, setheight] = useState(null);
  const [backgroundColor, setbackgroundColor] = useState("white");
  const [margin, setmargin] = useState("10px");
  const [key, setkey] = useState(null);

  const onAddNode = (x, y, height, backgroundColor, margin, key) => {
    console.log("this is canvas", x, y, height, backgroundColor, margin, key);
    setxx(x);
    setyy(y);
    setheight(height);
    setbackgroundColor(backgroundColor);
    setmargin(margin);
    setkey(key);
  };

  const _onChange = (ev) => {
    setdarkTheme((prev) => {
      console.log(prev);
      return !prev;
    });
  };
  return (
    <div
      className="canvas-class"
      style={{ backgroundColor: darkTheme ? "#ffffff" : "#1a1f1f" }}
    >
      <motion.div
        animate={{
          width: open ? "80%" : "94%",
        }}
        className="canvas"
      >
        <div
          style={{
            height: "93%",
            backgroundColor: darkTheme ? "#ffffff" : "#1a1f1f",
          }}
        >
          <div
            style={{
              height: "50px",
              display: "flex",
              justifyContent: "flex-end",
              backgroundColor: darkTheme ? "#ffffff" : "#1a1f1f",
            }}
          >
            <Toggle
              style={{ padding: "2px" }}
              // label="Enabled and checked"
              defaultUnChecked
              // onText="On"
              // offText="Off"
              onChange={_onChange}
            />
          </div>
          <FlowChart
            cords={[xx, yy]}
            styles={[height, margin, backgroundColor]}
            keyId={key}
            nodes={nodes}
            edges={initialEdges}
            theme={darkTheme}
          ></FlowChart>
        </div>
      </motion.div>
      <motion.div
        animate={{
          height: open ? "100%" : "50px",
          width: open ? "250px" : "50px",
        }}
        transition={{
          type: "inirtia",

          duration: "0.3",
        }}
        className="right-bar"
        style={{ backgroundColor: darkTheme ? "#ffffff" : "#1a1f1f" }}
      >
        <RightBar
          onAddNewNode={onAddNode}
          setOpenRightBar={setOpen}
          theme={darkTheme}
        ></RightBar>
      </motion.div>
    </div>
  );
};

export default Canvas;
