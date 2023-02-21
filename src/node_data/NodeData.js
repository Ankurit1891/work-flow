const initialNodes = [
  {
    id: "0",
    key: "0",
    name: "start",
    type: "input",
    data: { label: "Start" },
    position: { x: 500, y: 150 },
  },

  // {
  //   id: "2",
  //   key: "2",
  //   // you can also pass a React component as a label
  //   data: { label: <div>2</div> },
  //   position: { x: 100, y: 125 },
  // },
  // {
  //   id: "3",
  //   key: "3",
  //   type: "output",
  //   data: {
  //     label: <div>3</div>,
  //   },
  //   position: { x: 250, y: 250 },
  // },
];
const initialEdges = [
  // {
  //   id: "e1->2",
  //   source: "1",
  //   target: "2",
  //   type: "smoothstep",
  //   animated: true,
  // },
  // {
  //   id: "e2->3",
  //   source: "2",
  //   target: "3",
  //   type: "smoothstep",
  //   animated: false,
  // },
  // {
  //   id: "e1->3",
  //   source: "1",
  //   target: "3",
  //   type: "smoothstep",
  //   animated: false,
  // },
];

export { initialNodes, initialEdges };
