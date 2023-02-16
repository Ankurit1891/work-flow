import React from "react";

const CustomNode = (props) => {
  const onClickHandler = () => {
    if (props.parent === "rightBar") {
      const x = Math.trunc(Math.random() * 600);
      const y = Math.trunc(Math.random() * 50);
      console.log(x, y);
      props.onNodeAdd(x, y);
    }
  };
  return (
    <div
      onClick={onClickHandler}
      key={props.key}
      style={{
        display: "flex",
        flexDirection: "column",
        height: props.Nodeheight,
        width: "wrap",
        maxWidth: "170px",
        backgroundColor: props.NodebackgroundColor,
        borderRadius: "10px",
        margin: props.Nodemargin,
        padding: "10px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        🔘<div style={{ color: "grey" }}>Ankurit</div>
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
