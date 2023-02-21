import React, { useState } from "react";
import "../App.css";
import { motion } from "framer-motion";
import FlowChart from "../components/FlowChart";
import RightBar from "../components/RightBar";

import { initialNodes, initialEdges } from "../node_data/NodeData";

const Canvas = (props) => {
  const [nodes, setNodes] = useState(initialNodes);

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

  return (
    <div className="canvas-class">
      <motion.div
        animate={{
          width: open ? "80%" : "94%",
        }}
        className="canvas"
      >
        <FlowChart
          cords={[xx, yy]}
          styles={[height, margin, backgroundColor]}
          keyId={key}
          nodes={nodes}
          edges={initialEdges}
        ></FlowChart>
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
      >
        <RightBar onAddNewNode={onAddNode} setOpenRightBar={setOpen}></RightBar>
      </motion.div>
    </div>
  );
};

export default Canvas;
