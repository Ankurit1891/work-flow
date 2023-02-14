import React from "react";

const CustomNode = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // height: "200px",
        width: "wrap",
        backgroundColor: "grey",
        borderRadius: "10px",
        margin: "0px",
        padding: "20px",
      }}
    >
      <div>✏️</div>
      <div>{props.name}</div>
      <div>
        <input type="text" style={{ width: "90%" }} />
      </div>
    </div>
  );
};

export default CustomNode;
