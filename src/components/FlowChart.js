import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import "reactflow/dist/style.css";
import { BsSave2 } from "react-icons/bs";
import { BsFillPrinterFill } from "react-icons/bs";

import ReactFlow, {
  Background,
  ControlButton,
  MarkerType,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Panel,
  Controls,
} from "reactflow";
import "../App.css";
import { nodeStyle } from "../node_data/RightBarNodeList";
import { initialEdges, initialNodes } from "../node_data/NodeData";
import CustomNode from "./CustomNode";
import Modal from "./Modal";
import { useDrop } from "react-dnd";
import NodeForm from "./NodeForm";
import EdgeModalForm from "./EdgeModalForm";
import html2canvas from "html2canvas";

const FlowChart = (props) => {
  const [nodeObject, setNodeObject] = useState({
    xCords: 0,
    yCords: 0,
    nodeKey: "",
    nodeBackgroundColor: "",
    nodeHeight: "",
    nodeMargin: "",
    nodeType: "",
    nodeIcon: "",
    nodeName: "",
    NodeDescription: "",
  });
  // const [showEdgeModal, setShowEdgeModal] = useState(false);
  const [edgeObject, setEdgeObject] = useState({ text: "edge", desc: "" });
  const [canvasColor, setCanvasColor] = useState("#232629");
  const [edges, setEdges] = useState(initialEdges);
  const [nodes, setNodes] = useState(initialNodes);
  const [openModal, setOpenModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openEdgeFormModal, setEdgeOpenFormModal] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item, monitor) => {
      console.log(isOver);
      const dropCoordinates = monitor.getClientOffset();
      setNodeObject({
        xCords: dropCoordinates.x - 150,
        yCords: dropCoordinates.y - 180,
        nodeKey: item.nodeKey,
        nodeBackgroundColor: item.nodeBackgroundColor,
        nodeHeight: item.nodeHeight,
        nodeMargin: item.nodeMargin,
        nodeType: item.nodeType,
        nodeIcon: item.nodeIcon,
        nodeName: item.nodeName,
        NodeDescription: "",
      });
      // xCords = dropCoordinates.x - 150;
      // yCords = dropCoordinates.y - 180;
      // nodeKey = item.nodeKey;
      // nodeBackgroundColor = item.nodeBackgroundColor;
      // nodeHeight = item.nodeHeight;
      // nodeMargin = item.nodeMargin;
      // setNodeIcon(item.nodeIcon);
      // nName = item.nodeName;
      // nIcon = ;
      // setNodeName(item.nodeName);
      // nodeType = ;
      setOpenFormModal((e) => {
        return !e;
      });

      // onAddNode(
      //   xCords,
      //   yCords,
      //   nodeKey,
      //   nodeBackgroundColor,
      //   nodeHeight,
      //   nodeMargin,
      //   nIcon,
      //   nName,
      //   nodeType
      // );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // on acception the node form

  const onClickForm = (description) => {
    console.log(nodeObject.nodeName, nodeObject.xCords);
    onAddNode(
      nodeObject.xCords,
      nodeObject.yCords,
      nodeObject.nodeKey,
      nodeObject.nodeBackgroundColor,
      nodeObject.nodeHeight,
      nodeObject.nodeMargin,
      nodeObject.nodeIcon,
      nodeObject.nodeName,
      nodeObject.nodeType,
      description
    );
  };
  // const uniqueId = () => {
  //   const dateString = Date.now().toString(36);
  //   const randomness = Math.random().toString(36).substr(2);
  //   return dateString + randomness;
  // };

  // making a new node

  const onAddNode = (
    x,
    y,
    keyId,
    backgroundColor,
    height,
    margin,
    icon,
    name,
    type,
    description
  ) => {
    console.log(x, y, keyId, backgroundColor, height, margin, icon, name, type);
    const color = backgroundColor;
    // const description = prompt("Enter the node description");

    switch (type) {
      case "input":
        type = "input";
        break;
      case "output":
        type = "output";
        break;
      default:
        type = "default";
        break;
    }

    const newNode = {
      // id: `${uniqueId()}`,
      id: `${nodes.length}`,
      name: name,
      description: description,
      type: type,
      key: `${Math.trunc(Math.random() * 500)}`,
      keyId: String(keyId),
      animated: false,
      color: color,
      data: {
        label: (
          <div>
            <CustomNode
              NodeIcon={icon}
              NodeDescription={description}
              Nodeheight={height}
              NodebackgroundColor={color}
              Nodemargin={margin}
              NodeName={name}
              parent={"flowchart"}
            ></CustomNode>
          </div>
        ),
        style: { nodeStyle },
      },
      position: { x: x, y: y },
    };
    setNodes((prevNode) => {
      return [...prevNode, newNode];
    });
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onAddEdge = (text, desc) => {
    setEdgeObject({ text: text, desc: desc });
  };

  // onconnect the edge (adding the edge)

  const onConnect = (params) => {
    setEdgeOpenFormModal(true);
    if (!openEdgeFormModal) {
      const { source, target } = params;
      const newEdge = {
        id: `e${source}->${target}`,
        source: source,
        target: target,
        strokeWidth: 3,
        color: "black",
        type: "smoothstep",
        className: "smooth-edge",
        animated: false,
        orient: "auto",
        style: { width: "10px", border: "2px solid white" },
        labelBgStyle: { fill: "#232629" },
        // offset: { x: 20, y: 20 },
        labelStyle: {
          fill: "white",
          fontWeight: "400",
        },
        labelShowBg: true,
        label: edgeObject.text,
        description: edgeObject.label,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };
      setEdges([...edges, newEdge]);
    }
  };

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  //  function on node left click

  const onNodeLeftClick = (event, node) => {
    // if (node.id === "0") {
    //   // console.log(node.position.x);
    //   onAddNode(node.position.x, node.position.y);
    // }
    // console.log(
    //   "Node clicked:",
    //   node.id,
    //   " name:",
    //   node.name,
    //   "keyId:",
    //   node.keyId
    // );

    if (node && node.getOutgoingEdges) {
      const outgoers = node.getOutgoingEdges();
      console.log("Outgoing edges:", outgoers);
    }
  };

  //function on mouse click on edge

  const onEdgeRightClick = (event, edge) => {};

  //function on making the mouse entering the edge

  const onEndeMouseEnter = (event, edge) => {
    // setShowEdgeModal((val) => {
    //   console.log(`New val = ${!val}`);
    //   return !val;
    // });
    // console.log(uniqueId());
    // console.log(showEdgeModal);
  };

  //function on making the mouse leaving the edge

  const onEndeMouseLeave = (event, edge) => {
    // setShowEdgeModal((val) => {
    //   console.log(`New val = ${!val}`);
    //   return !val;
    // });
    // console.log(showEdgeModal);
  };

  // on node right click

  const onNodeRightClick = (event, node) => {
    setOpenModal(true);
    event.preventDefault();
  };

  // mini-map node colour

  const nodeColor = (node) => {
    return node.color === "white" ? "grey" : node.color;
  };

  // changing the colour of the canvas

  const onColorChangeHandler = (e) => {
    setCanvasColor(e.target.value);
  };

  // exporting the workflow to chart

  const exportFlowchart = () => {
    const flowchart = document.querySelector(".react-flow");
    html2canvas(flowchart).then((canvas) => {
      const dataUrl = canvas.toDataURL();
      const link = document.createElement("a");
      link.download = "flowchart.png";
      link.href = dataUrl;
      link.click();
    });
  };

  // rendering the component in react flow

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: canvasColor,
        borderRadius: "7px",
        border: "1px solid grey",
      }}
    >
      {/* //Opening the form modal for nodes */}
      {openFormModal && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.05 }}
        >
          <NodeForm
            onAddNode={onClickForm}
            setOpenFormModal={setOpenFormModal}
            nodeName={nodeObject.nodeName}
            nodeIcon={nodeObject.nodeIcon}
            nodeBackgroundColor={nodeObject.nodeBackgroundColor}
          />
        </motion.div>
      )}
      {/* //Opening the form modal for edges */}
      {openEdgeFormModal && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.05 }}
        >
          <EdgeModalForm
            onAddEdge={onAddEdge}
            setEdgeOpenFormModal={setEdgeOpenFormModal}
          ></EdgeModalForm>
        </motion.div>
      )}
      {/* {//Opening the form modal for nodes on right click} */}
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        snapToGrid={true}
        onNodeClick={onNodeLeftClick}
        onNodeContextMenu={onNodeRightClick}
        onEdgeClick={onEdgeRightClick}
        onEdgeMouseEnter={onEndeMouseEnter}
        onEdgeMouseLeave={onEndeMouseLeave}
        fitView
      >
        <Background variant="dots" gap={10} size={0.3} color="white" />
        <MiniMap nodeColor={nodeColor} />
        <Controls>
          <ControlButton
            style={{ width: "wrap-content" }}
            onClick={() => {
              edges.map((e) => {
                return console.log(e);
              });
              nodes.map((e) => {
                return console.log(e);
              });
            }}
          >
            <BsFillPrinterFill />
          </ControlButton>
          <ControlButton
            onClick={() => {
              exportFlowchart();
            }}
          >
            <BsSave2 />
          </ControlButton>
        </Controls>
        <Panel position="top-left">
          <div className="panel__background-color">
            <span>Background Color</span>
            <input
              type="color"
              name="canvas-color"
              value={canvasColor}
              onChange={onColorChangeHandler}
            />
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
