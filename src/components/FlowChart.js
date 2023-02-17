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
import { nodeStyle } from "../node_data/RightBarNodeList";
import { initialEdges, initialNodes } from "../node_data/NodeData";
import CustomNode from "./CustomNode";
import Modal from "./Modal";
import NodeForm from "./NodeForm";
import { useDrop } from "react-dnd";

const FlowChart = (props) => {
  const [edges, setEdges] = useState(initialEdges);
  const [nodes, setNodes] = useState(initialNodes);
  const [openModal, setOpenModal] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item, monitor) => {
      console.log(
        `id = ${item.id},
        x =${item.x},
        y =${item.y},
        key =${item.nodeKey},
        height =${item.nodeHeight},
        color =${item.nodeBackgroundColor},
        margin =${item.nodeMargin}`
      );
      onAddNode(
        item.x,
        item.y,
        item.nodeKey,
        item.nodeBackgroundColor,
        item.nodeHeight,
        item.nodeMargin
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (props.cords[0] && props.cords[1]) {
      onAddNode(
        props.cords[0],
        props.cords[1],
        props.styles[0],
        props.styles[1],
        props.styles[2],
        props.keyId
      );
    }
  }, [props.cords[0], props.cords[1]]);

  const onAddNode = (x, y, keyId, backgroundColor, height, margin) => {
    console.log(
      `x = ${x} ,y = ${y} printing key = ${keyId} - height=${height} - margin=${margin} - backgroundCOlor = ${backgroundColor}`
    );
    const color = backgroundColor;
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
    console.log(keyId);
    const newNode = {
      id: `${nodes.length + 1}`,
      key: `${nodes.length + 1}`,
      type: type,
      name: name,
      keyId: String(keyId),
      animated: false,
      data: {
        label: (
          <div>
            <CustomNode
              Nodeheight={height}
              NodebackgroundColor={color}
              Nodemargin={margin}
              name={name}
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
    console.log(
      "Node clicked:",
      node.id,
      " name:",
      node.name,
      "keyId:",
      node.keyId
    );
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
    <div ref={drop} style={{ width: "100%", height: "100%" }}>
      {/* {openFormModal && <NodeForm setOpenFormModal={setOpenFormModal} />} */}
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <ReactFlow
        // ref={drop}
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
