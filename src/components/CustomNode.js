import React from "react";

import { useDrag } from "react-dnd";
import { motion, transform } from "framer-motion";
import "../App.css";

const CustomNode = (props) => {
  const x = Math.trunc(Math.random() * 500);
  const y = Math.trunc(Math.random() * 50);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: {
      id: props.NodeID,
      x: x,
      y: y,
      nodeKey: props.NodeKey,
      nodeHeight: props.Nodeheight,
      nodeBackgroundColor: props.NodebackgroundColor,
      nodeMargin: props.Nodemargin,
      nodeIcon: props.NodeIcon,
      nodeName: props.NodeName,
      nodeType: props.NodeType,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      key={props.key}
      whileHover={{
        scale: props.parent === "rightBar" ? 1.1 : 1,
      }}
      className="custom-node"
      style={{
        opacity: isDragging ? "0.3" : "1",
        cursor: isDragging ? "grabbing" : "grab",
        display: "flex",
        flexDirection: "column",
        height: isDragging ? "100px" : "wrap",
        width: props.parent === "rightBar" ? "180px" : "wrap",
        maxWidth: "170px",
        border: isDragging ? "5px solid white" : "1px solid white",
        backgroundColor: props.NodebackgroundColor,
        borderRadius: isDragging ? "0px" : "5px",
        margin: props.parent === "rightBar" ? props.Nodemargin : "-5px",
        padding: props.parent === "rightBar" ? "15px" : "10px",
        paddingBottom: props.parent === "rightBar" ? "15px" : "0px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <span
          style={{
            color: "white",
            marginRight: "10px",
          }}
        >
          {props.NodeIcon}
        </span>
        <div style={{ color: "white", fontWeight: "600", textAlign: "left" }}>
          <i>{props.NodeName}</i>
        </div>
      </div>
      <br />
      <div style={{ textAlign: "left" }}>
        <span
          style={{
            color: "white",
            fontWeight: "300",
            textAlign: "left",
            fontSize: props.parent === "rightBar" ? "15px" : "9px",
          }}
        >
          {props.NodeDescription}
        </span>
      </div>
    </motion.div>
  );
};

export default CustomNode;
