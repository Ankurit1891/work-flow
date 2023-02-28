import React, { useState } from "react";
import CustomNode from "./CustomNode";
import { motion } from "framer-motion";
import { nodeList } from "../node_data/RightBarNodeList";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { AiOutlineDoubleLeft } from "react-icons/ai";

const RightBar = (props) => {
  const [openBar, setOpenBar] = useState(true);
  const [isOpen, setisOpen] = useState(<AiOutlineDoubleRight />);
  let open = true;

  const sidebarOnClickHandler = (e) => {
    props.setOpenRightBar((prev) => {
      open = !prev;
      setOpenBar(open);
      setisOpen((prev) => {
        return open === true ? (
          <AiOutlineDoubleRight />
        ) : (
          <AiOutlineDoubleLeft />
        );
      });
      return !prev;
    });
  };

  const onNodeAdd = (x, y, height, backgroundColor, margin, key) => {
    props.onAddNewNode(x, y, height, backgroundColor, margin, key);
  };
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "fit-content",
          height: "fit-content",
        }}
      >
        <motion.div
          whileHover={{
            scale: 1.1,
            originX: 0,
            originY: 0,
          }}
          className="sidebar-button"
          onClick={sidebarOnClickHandler}
        >
          <motion.div
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
          >
            {isOpen}
          </motion.div>
        </motion.div>
      </div>

      {openBar && (
        <div style={{ overflowY: "auto", overflowX: "hidden" }}>
          {nodeList.map((node) => {
            return (
              <div className="draggable-object" key={node.key}>
                <div>
                  <CustomNode
                    NodeType={node.nodeType}
                    NodeIcon={node.nodeIcon}
                    NodeName={node.nodeName}
                    NodeDescription={node.nodeDescription}
                    parent={"rightBar"}
                    onNodeAdd={onNodeAdd}
                    NodeKey={node.nodeID}
                    NodeID={node.nodeID}
                    Nodeheight={node.nodeHeight}
                    Nodewidth={node.nodeWidth}
                    NodebackgroundColor={node.nodeBackgroundColor}
                    NodeborderRadius={node.nodeBorderRadius}
                    Nodemargin={node.nodeMargin}
                    Nodepadding={node.nodePadding}
                  ></CustomNode>
                </div>
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
