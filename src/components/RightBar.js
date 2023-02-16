import React, { useState } from "react";
import CustomNode from "./CustomNode";
import { motion } from "framer-motion";
import { nodeList } from "../node_data/RightBarNodeList";
const RightBar = (props) => {
  const onClickHandler = () => {
    console.log("hi");
  };
  const [openBar, setOpenBar] = useState(true);
  const [isOpen, setisOpen] = useState("➡️");
  let open = true;

  const sidebarOnClickHandler = (e) => {
    props.setOpenRightBar((prev) => {
      console.log("was", prev, "now", !prev);
      open = !prev;
      setOpenBar(open);
      setisOpen((prev) => {
        return open === true ? "➡️" : "⬅️";
      });
      return !prev;
    });
  };

  console.log(open);
  const onNodeAdd = (x, y) => {
    props.onAddNewNode(x, y);
  };
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.button
          whileHover={{
            scale: 1.1,
            originX: 0,
            originY: 0,
            color: "#f8e112",
          }}
          className="sidebar-button"
          onClick={sidebarOnClickHandler}
        >
          <div>{isOpen}</div>
        </motion.button>
      </div>

      {openBar && (
        <div style={{ overflowY: "auto", overflowX: "hidden" }}>
          {nodeList.map((node) => {
            return (
              <div key={node.key}>
                <CustomNode
                  parent={"rightBar"}
                  onNodeAdd={onNodeAdd}
                  key={node.NodeKey}
                  NodeID={node.nodeID}
                  Nodeheight={node.nodeHeight}
                  Nodewidth={node.nodeWidth}
                  NodebackgroundColor={node.nodeBackgroundColor}
                  NodeborderRadius={node.nodeBorderRadius}
                  Nodemargin={node.nodeMargin}
                  Nodepadding={node.nodePadding}
                ></CustomNode>
              </div>
            );
          })}
        </div>
      )}

      {/* <button onClick={onClickHandler}>CLick</button> */}
    </div>
  );
};

export default RightBar;
