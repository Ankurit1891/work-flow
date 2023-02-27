import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import "reactflow/dist/style.css";
import { BsSave2 } from "react-icons/bs";
import { BsFillPrinterFill } from "react-icons/bs";
import { AiOutlineFontSize } from "react-icons/ai";

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
import OptionDialog from "./OptionDialog";

const FlowChart = (props) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [selectedEdge, setSelectedEdge] = useState(null);
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
  const [openDialog, setOpenDialog] = useState(false);
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
      setOpenFormModal((e) => {
        return !e;
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // on acception the node form

  const onClickForm = (description) => {
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
    const color = backgroundColor;

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

  // onconnect the edge (adding the edge)

  const onConnect = (params) => {
    if (!openEdgeFormModal) {
      const { source, target } = params;
      // onEdgeAdd(source,target);
      const newEdge = {
        id: `e${source}->${target}`,
        source: source,
        target: target,
        strokeWidth: 3,
        color: "black",
        type: "smoothstep",
        className: "smoothstep",
        animated: false,
        orient: "auto",
        style: { width: "10px", border: "2px solid white" },
        labelBgStyle: { fill: "#232629" },

        labelStyle: {
          fill: "white",
          fontWeight: "400",
        },
        labelShowBg: true,
        label: "",
        description: "",
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
    console.log(node);

    if (node && node.getOutgoingEdges) {
      const outgoers = node.getOutgoingEdges();
      console.log("Outgoing edges:", outgoers);
    }
  };

  //function on edge right click

  const onEdgeRightClick = (event, edge) => {
    // console.log(edge.selected);
    // edge.selected = false;
    // console.log(edge.selected);
    event.stopPropagation();
    event.preventDefault();
    setSelectedEdge(edge);
    // setSelectedEdge({ selected: false });
    setEdgeOpenFormModal(true);
  };

  //function on making the mouse entering the edge

  const onEndeMouseEnter = (event, edge) => {};

  //function on making the mouse leaving the edge

  const onEndeMouseLeave = (event, edge) => {};

  // on node right click

  const onNodeRightClick = (event, node) => {
    event.stopPropagation();
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

  const onCanvasRightClick = (e) => {
    e.preventDefault();
    setCoords({
      x: e.clientY - 30,
      y: e.clientX - 70,
    });
    setOpenDialog((e) => {
      return !e;
    });
  };
  const AddNode = () => {
    const xPos = nodes[nodes.length - 1].position.x;
    const yPos = nodes[nodes.length - 1].position.y + 100;
    onAddNode(
      xPos,
      yPos,
      "newKey",
      "grey",
      "100px",
      "10px",
      <AiOutlineFontSize />,
      "Node Name",
      "type - Custom",
      "desc"
    );
  };
  // // rendering the component in react flow
  // function handleKeyDown(event) {
  //   if (
  //     event.key === "Enter" &&
  //     event.target.classList.contains("react-flow")
  //   ) {
  //     event.stopPropagation();
  //     console.log("Enter key pressed!");
  //   }
  // }

  // // Register the event listener on the document object
  // document.addEventListener("keydown", handleKeyDown);

  const onAlterEdge = (text, desc, id) => {
    selectedEdge.label = text;
    selectedEdge.description = desc;
    let newEdges = [];
    edges.forEach((edge, index) => {
      if (edge.id !== id) {
        newEdges.push(edge);
      }
    });
    newEdges.push(selectedEdge);
    setEdges(newEdges);
  };

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
      {openDialog && (
        <OptionDialog
          xCords={coords.x}
          yCords={coords.y}
          AddNode={AddNode}
          setOpenDialog={setOpenDialog}
        ></OptionDialog>
      )}
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
            edge={selectedEdge}
            alterEdge={onAlterEdge}
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
        onClick={() => {
          setOpenDialog(false);
        }}
        onNodeClick={onNodeLeftClick}
        onNodeContextMenu={onNodeRightClick}
        onEdgeContextMenu={onEdgeRightClick}
        onEdgeMouseEnter={onEndeMouseEnter}
        onEdgeMouseLeave={onEndeMouseLeave}
        onContextMenu={onCanvasRightClick}
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
