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

  const onAddNode = (x, y) => {
    console.log("this is canvas", x, y);
    setxx(x);
    setyy(y);
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
          // stiffness: "200",
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
