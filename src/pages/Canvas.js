import React, { useState } from "react";
import "../App.css";

import { motion } from "framer-motion";
import FlowChart from "../components/FlowChart";
import RightBar from "../components/RightBar";
import { Toggle } from "@fluentui/react/lib/Toggle";
import { initialNodes, initialEdges } from "../node_data/NodeData";
import { ThemeProvider } from "@fluentui/react";
import { lightTheme } from "../themes/lightTheme";
import { darkTheme } from "../themes/darkTheme";
const Canvas = (props) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [isdarkTheme, setIsDarkTheme] = useState(true);
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
    setIsDarkTheme((prev) => {
      console.log(prev);
      return !prev;
    });
  };

  const updatedNodes = (newNodes) => {
    setNodes(newNodes);
  };

  return (
    <ThemeProvider
      theme={isdarkTheme ? lightTheme : darkTheme}
      style={{ height: "100vh" }}
    >
      <div
        className="canvas-class"
        // style={{ backgroundColor: isdarkTheme ? "#ffffff" : "#1a1f1f" }}
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
              // backgroundColor: isdarkTheme ? "#ffffff" : "#1a1f1f",
            }}
          >
            <div
              style={{
                height: "50px",
                display: "flex",
                justifyContent: "flex-end",
                // backgroundColor: isdarkTheme ? "#ffffff" : "#1a1f1f",
              }}
            >
              <Toggle
                style={{ padding: "2px" }}
                defaultUnChecked
                onChange={_onChange}
              />
            </div>
            <FlowChart
              updatedNodes={updatedNodes}
              cords={[xx, yy]}
              styles={[height, margin, backgroundColor]}
              keyId={key}
              nodes={nodes}
              edges={initialEdges}
              theme={isdarkTheme}
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
          style={{ backgroundColor: isdarkTheme ? "#ffffff" : "#000000" }}
        >
          <RightBar
            nodes={nodes}
            onAddNewNode={onAddNode}
            setOpenRightBar={setOpen}
            theme={isdarkTheme}
          ></RightBar>
        </motion.div>
      </div>
    </ThemeProvider>
  );
};

export default Canvas;
