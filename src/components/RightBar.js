import React from "react";

const RightBar = (props) => {
  //   const [node, setNode] = useState(initialNodes);
  //   const [edges, setEdges] = useState(initialEdges);
  const onClickHandler = () => {
    console.log("hi");
    const newNode = {
      id: Math.random(),
      key: Math.random(),
      type: "input",
      data: { label: "Input Node" },
      position: { x: Math.random() * 350, y: Math.random() * 350 },
    };
    props.onAddNode(newNode);
  };
  return (
    <div>
      <button onClick={onClickHandler}>Add</button>
    </div>
  );
};

export default RightBar;
