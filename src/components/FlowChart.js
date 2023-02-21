import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  ControlButton,
  MarkerType,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
} from "react-flow-renderer";
import "../App.css";
import { nodeStyle } from "../node_data/RightBarNodeList";
import { initialEdges, initialNodes } from "../node_data/NodeData";
import CustomNode from "./CustomNode";
import Modal from "./Modal";
import { useDrop } from "react-dnd";
import NodeForm from "./NodeForm";

const FlowChart = (props) => {
  const [edges, setEdges] = useState(initialEdges);
  const [nodes, setNodes] = useState(initialNodes);
  const [openModal, setOpenModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item, monitor) => {
      const dropCoordinates = monitor.getClientOffset();
      const xCords = dropCoordinates.x - 150;
      const yCords = dropCoordinates.y - 180;

      setOpenFormModal((e) => {
        return !e;
      });

      console.log(`after setting form modal`);
      onAddNode(
        xCords,
        yCords,
        item.nodeKey,
        item.nodeBackgroundColor,
        item.nodeHeight,
        item.nodeMargin,
        item.nodeIcon,
        item.nodeName,
        item.nodeType
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
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
    type
  ) => {
    console.log(x, y, keyId, backgroundColor, height, margin, icon, name);
    const color = backgroundColor;
    const description = prompt("Enter the node description");

    switch (type) {
      case "input":
        type = "input";
        break;
      case "output":
        type = "output";
        break;
      default:
        type = "";
        break;
    }

    const newNode = {
      id: `${uniqueId()}`,
      key: `${Math.trunc(Math.random() * 500)}`,
      type: type,
      name: name,
      keyId: String(keyId),
      animated: false,
      data: {
        label: (
          <div
          // className="react-flow__node-default react-flow__node-group react-flow__node-input react-flow__node-output"
          // style={{ padding: "2px" }}
          >
            <CustomNode
              // className="react-flow__node-default react-flow__node-group react-flow__node-input react-flow__node-output"
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

  const onConnect = (params) => {
    const { source, target } = params;
    const newEdge = {
      id: `e${source}->${target}`,
      source: source,
      target: target,
      strokeWidth: 3,
      color: "black",
      type: "smoothstep",
      animated: false,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };
    setEdges([...edges, newEdge]);
  };

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeLeftClick = (event, node) => {
    if (node.id === "0") {
      // console.log(node.position.x);
      onAddNode(node.position.x, node.position.y);
    }
    console.log(
      "Node clicked:",
      node.id,
      " name:",
      node.name,
      "keyId:",
      node.keyId
    );
  };
  const onEdgeRightClick = (event, edge) => {};
  const onEndeMouseEnter = (event, edge) => {};

  const onNodeRightClick = (event, node) => {
    setOpenModal(true);
    event.preventDefault();
  };
  return (
    <div
      ref={drop}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#232629",
        borderRadius: "7px",
        border: "1px solid grey",
      }}
    >
      {/* {openFormModal && <NodeForm setOpenFormModal={setOpenFormModal} />} */}
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
        fitView
      >
        <MiniMap />
        <Background variant="dots" gap={10} size={0.3} color="white" />
        <Controls>
          <ControlButton
            onClick={() => {
              edges.map((e) => {
                return console.log(e);
              });
              nodes.map((e) => {
                return console.log(e);
              });
            }}
          >
            Add
          </ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
