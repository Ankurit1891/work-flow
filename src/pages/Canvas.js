import React, { useState } from "react";
import "../App.css";
import FlowChart from "../components/FlowChart";
import RightBar from "../components/RightBar";

import { initialNodes, initialEdges } from "../node_data/NodeData";

const Canvas = (props) => {
  const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges] = useState(initialEdges);

  const addNodeHandler = (newNode) => {
    setNodes((prevNode) => {
      return [...nodes, newNode];
    });
  };

  return (
    <div className="canvas-class">
      <div className="canvas">
        <FlowChart nodes={nodes} edges={initialEdges}>
          {props.children}
        </FlowChart>
      </div>
      <div className="right-bar">
        <RightBar onAddNode={addNodeHandler}></RightBar>
      </div>
    </div>
  );
};

export default Canvas;
