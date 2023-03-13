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
  Controls,
} from "reactflow";
import "../App.css";
import { nodeStyle } from "../node_data/RightBarNodeList";
import { initialEdges, initialNodes } from "../node_data/NodeData";
import CustomNode from "./CustomNode";
import { useDrop } from "react-dnd";
import EdgeModalForm from "./EdgeModalForm";
import html2canvas from "html2canvas";
import OptionDialog from "./OptionDialog";
import NodeFormModal from "./NodeFormModal";

const FlowChart = (props) => {
  const [nodeValues, setnodeValues] = useState({
    color: "",
    icon: {},
    type: "",
  });
  const [nodeName, setnodeName] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeObject, setNodeObject] = useState({
    id: null,
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
  const [edges, setEdges] = useState(initialEdges);
  const [nodes, setNodes] = useState(initialNodes);
  const [openModal, setOpenModal] = useState(false);
  const [openEdgeFormModal, setEdgeOpenFormModal] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item, monitor) => {
      console.log(isOver);
      setNodeObject({
        xCords: nodes.length > 0 ? nodes[nodes.length - 1].position.x : 500,
        yCords: nodes.length > 0 ? nodes[nodes.length - 1].position.y : 150,
        nodeKey: item.nodeKey,
        nodeBackgroundColor: item.nodeBackgroundColor,
        nodeHeight: item.nodeHeight,
        nodeMargin: item.nodeMargin,
        nodeType: item.nodeType,
        nodeIcon: item.nodeIcon,
        nodeName: item.nodeName,
        NodeDescription: "",
      });
      assignNodeValues(
        item.nodeBackgroundColor,
        item.nodeIcon,
        item.nodeType,
        item.nodeType
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const onAddNode = (
    keyId,
    backgroundColor,
    height,
    margin,
    icon,
    name,
    type,
    description,
    id = null,
    positionX = null,
    positionY = null
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
      id: id === null ? `${nodes.length}` : id,
      icon: icon,
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
      position: {
        x: positionX
          ? positionX
          : nodes.length > 0
          ? nodes[nodes.length - 1].position.x
          : 500,
        y: positionY
          ? positionY
          : nodes.length > 0
          ? nodes[nodes.length - 1].position.y + 100
          : 150,
      },
    };
    setNodes((prevNode) => {
      return [...prevNode, newNode];
    });
    props.updatedNodes(nodes);
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  // onconnect the edge (adding the edge)

  const onConnect = (params) => {
    if (!openEdgeFormModal) {
      const { source, target } = params;
      const newEdge = {
        id: `e${source}->${target}`,
        source: source,
        target: target,
        strokeWidth: 3,
        type: "smoothstep",
        className: "smoothstep",
        animated: false,
        orient: "auto",
        labelBgStyle: { fill: "grey" },
        labelStyle: {
          fill: "white",
          fontWeight: "400",
        },
        labelShowBg: true,
        label: "",
        description: "",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "grey",
        },
      };
      setEdges([...edges, newEdge]);
      props.updatedNodes(nodes);
    }
  };

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  //  function on node left click

  const onNodeLeftClick = (event, node) => {
    props.updatedNodes(nodes);
    console.log(node);
    setOpenDialog(false);
    if (node && node.getOutgoingEdges) {
      const outgoers = node.getOutgoingEdges();
      console.log("Outgoing edges:", outgoers);
    }
  };

  //function on edge right click

  const onEdgeRightClick = (event, edge) => {
    props.updatedNodes(nodes);
    event.stopPropagation();
    event.preventDefault();
    setSelectedEdge(edge);
    setEdgeOpenFormModal(true);
  };

  //function on making the mouse entering the edge

  const onEndeMouseEnter = (event, edge) => {};

  //function on making the mouse leaving the edge

  const onEndeMouseLeave = (event, edge) => {};

  // on node right click

  // mini-map node colour

  const nodeColor = (node) => {
    return node.color === "white" ? "grey" : node.color;
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
    props.updatedNodes(nodes);
    e.preventDefault();
    setCoords({
      x: e.clientY - 30,
      y: e.clientX - 70,
    });
    setOpenDialog((e) => {
      return !e;
    });
  };

  const onAlterNode = (text, desc) => {
    onAddNode(
      1212,
      nodeValues.color,
      "wrap",
      "-5px",
      nodeValues.icon,
      text,
      nodeValues.type,
      desc
    );
  };
  const removeNode = (id) => {
    let newNodes = [];
    nodes.map((node) => {
      if (node.id !== id) {
        newNodes.push(node);
      }
    });
    setNodes(newNodes);
    props.updatedNodes(nodes);
  };

  // removes node and add a new one
  const onNodeRightClick = (event, node) => {
    setOpenDialog(false);
    event.stopPropagation();
    event.preventDefault();
    if (node.id !== "0") {
      const nodeCp = node;
      const id = node.id;
      let name = prompt("Name");
      let desc = prompt("desc");
      if (name === "" || name === null) {
        name = node.name;
      }
      if (desc === "") {
        desc = node.description;
      }
      removeNode(node.id);
      onAddNode(
        nodeCp.keyId,
        nodeCp.color,
        nodeCp.height,
        nodeCp.margin,
        nodeCp.icon,
        name,
        nodeCp.type,
        desc,
        id,
        node.position.x,
        node.position.y
      );
    }
  };
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

  const assignNodeValues = (color, icon, type, text) => {
    setnodeValues({ color: color, icon: icon, type: type });
    setnodeName(text);
    setOpenModal(true);
    props.updatedNodes(nodes);
  };
  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        padding: "5px",
        height: "100%",
        backgroundColor: props.theme ? "#e1dcdc" : "#262627",
        borderRadius: "7px",
        border: props.theme ? "1px solid black" : "1px solid grey",
      }}
    >
      {/* opens a dialog box when canvas right click is done */}
      {openDialog && (
        <OptionDialog
          theme={props.theme}
          xCords={coords.x}
          yCords={coords.y}
          assignNodeValues={assignNodeValues}
          setOpenDialog={setOpenDialog}
        ></OptionDialog>
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
            theme={props.theme}
            edge={selectedEdge}
            alterEdge={onAlterEdge}
            setEdgeOpenFormModal={setEdgeOpenFormModal}
          ></EdgeModalForm>
        </motion.div>
      )}
      {/* {//Opening the form modal for nodes on right click} */}
      {openModal && (
        <NodeFormModal
          name={nodeName}
          theme={props.theme}
          node={selectedNode}
          nodeData={nodeValues}
          // nodeIcon={nodeObject.nodeIcon}
          // nodeBackgroundColor={nodeObject.nodeBackgroundColor}
          setOpenModal={setOpenModal}
          alterNode={onAlterNode}
        />
      )}
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
        <Background
          variant="dots"
          gap={10}
          size={0.3}
          color={props.theme ? "black" : "white"}
        />
        <MiniMap nodeColor={nodeColor} />
        <Controls
          position="top-right"
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "2px",
            // marginTop: "30px",
          }}
        >
          <ControlButton
            style={{ width: "wrap-content", padding: "5px" }}
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
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
