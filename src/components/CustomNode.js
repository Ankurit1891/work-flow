import React from "react";
import { useDrag } from "react-dnd";

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
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const onClickHandler = () => {
    if (props.parent === "rightBar") {
      props.onNodeAdd(
        x,
        y,
        props.NodeKey,
        props.Nodeheight,
        props.NodebackgroundColor,
        props.Nodemargin
      );
    }
  };
  return (
    <div
      ref={drag}
      // onClick={onClickHandler}
      key={props.key}
      style={{
        opacity: isDragging ? "0.3" : "1",
        display: "flex",
        flexDirection: "column",
        height: isDragging ? "100px" : props.Nodeheight,
        width: "wrap",
        maxWidth: "170px",
        border: isDragging ? "5px solid white" : "1px solid white",
        backgroundColor: props.NodebackgroundColor,
        borderRadius: isDragging ? "0px" : "2px",
        margin: props.parent === "rightBar" ? props.Nodemargin : "0px",
        padding: props.parent === "rightBar" ? "10px" : "20px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        🔘<div style={{ color: "grey" }}>{props.name}</div>
      </div>
      <br />
      <hr style={{ width: "50%", alignSelf: "center" }} />
      <div style={{ alignSelf: "center" }}>
        <input type="text" style={{ width: "90%", marginLeft: "5px" }} />
      </div>
    </div>
  );
};

export default CustomNode;
