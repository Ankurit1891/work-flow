import { useCallback, useState } from "react";
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

const FlowChart = () => {
  const [edges, setEdges] = useState(initialEdges);
  const [nodes, setNodes] = useState(initialNodes);
  const onClickHandler = () => {
    console.log("hi");
    const name = prompt("Enter the node name");
    const type = prompt("Enter the type...  Input , Output  or Default")
      .toLocaleLowerCase()
      .trim();

    const newNode = {
      id: `${nodes.length + 1}`,
      key: `${nodes.length + 1}`,
      type: type === "default" ? "" : type,
      data: { label: name },
      position: { x: 450, y: 325 },
    };
    const newNdge = {
      id: `e1-${newNode.id}`,
      source: "",
      target: `${newNode.id}`,
      animated: false,
    };

    setNodes((prevNode) => {
      return [...prevNode, newNode];
    });
    setEdges((prevEdge) => {
      return [...prevEdge, newNdge];
    });
  };

  console.log(nodes);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      {" "}
      <MiniMap />
      <Background variant="dots" gap={10} size={0.3} color="blue" />
      <Controls>
        <ControlButton onClick={onClickHandler}>Add Node</ControlButton>
      </Controls>
    </ReactFlow>
  );
};

export default FlowChart;
