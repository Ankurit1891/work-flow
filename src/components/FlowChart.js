import { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  Background,
  ControlButton,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
} from "react-flow-renderer";

import { initialEdges, initialNodes } from "../node_data/NodeData";
import CustomNode from "./CustomNode";
import Modal from "./Modal";
import NodeForm from "./NodeForm";

const FlowChart = (props) => {
  const [edges, setEdges] = useState(initialEdges);
  const [nodes, setNodes] = useState(initialNodes);
  const [openModal, setOpenModal] = useState(false);
  // const [openFormModal, setOpenFormModal] = useState(false);
  useEffect(() => {
    if (props.cords[0]) onAddNode(props.cords[0], props.cords[1]);
  }, [props.cords]);

  const onAddNode = (x, y) => {
    const name = prompt("Enter the node name");
    let type = prompt("Enter the type...  Input , Output  or Default")
      ?.toLowerCase()
      ?.trim();
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
      id: `${nodes.length}`,
      key: `${nodes.length}`,
      type: type,
      name: name,
      animated: false,
      data: {
        label: (
          <div>
            <CustomNode name={name}></CustomNode>
          </div>
        ),
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

  function handleEdgeChange(oldEdge, newConnection) {
    const sourceId = newConnection.source;
    const targetId = newConnection.target;
    console.log(sourceId);
    console.log(targetId);
  }

  const onConnect = (params) => {
    const { source, target } = params;
    const newEdge = {
      id: `e${source}->${target}`,
      source: source,
      target: target,
      type: "smoothstep",
      animated: true,
    };
    setEdges([...edges, newEdge]);
  };

  const onEdgeUpdate = (oldEdge, newConnection) => {
    const { source, target, data } = newConnection;
    console.log("Updated edge data:", data);
    console.log("Edge source:", source);
    console.log("Target :", target);
  };
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onNodeLeftClick = (event, node) => {
    if (node.id === "0") {
      console.log(node.position.x);
      onAddNode(node.position.x, node.position.y);
    }
    console.log("Node clicked:", node.id, " name:", node.name);
  };
  const onEdgeRightClick = (event, edge) => {
    console.log("Edge clicked:", edge.id, " name:", edge.name);
  };
  const onEndeMouseEnter = (event, edge) => {
    console.log("Mouse Enter");
  };

  const onNodeRightClick = (event, node) => {
    console.log("Node right-clicked:", node);
    setOpenModal(true);
    event.preventDefault();
  };
  return (
    <>
      {/* {openFormModal && <NodeForm setOpenFormModal={setOpenFormModal} />} */}
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeLeftClick}
        onNodeContextMenu={onNodeRightClick}
        onEdgeClick={onEdgeRightClick}
        onEdgeMouseEnter={onEndeMouseEnter}
        fitView
      >
        <MiniMap />
        <Background variant="dots" gap={10} size={0.3} color="blue" />
        <Controls>
          <ControlButton
            onClick={() => {
              edges.map((e) => {
                return console.log(e);
              });
            }}
          >
            Add
          </ControlButton>
        </Controls>
      </ReactFlow>
    </>
  );
};

export default FlowChart;
