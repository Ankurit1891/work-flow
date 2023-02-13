const initialNodes = [
  {
    id: "1",
    key: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    key: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    key: "3",
    type: "output",
    data: {
      label: (
        <div
          style={{
            backgroundColor: "wheat",
            border: "2px solid white",
            borderRadius: "7px",
          }}
        >
          Hi my name is ankurit
        </div>
      ),
    },
    position: { x: 250, y: 250 },
  },
  // {
  //   id: "6",
  //   key: "6",
  //   type: "input",
  //   data: { label: "Input Node" },
  //   position: { x: 350, y: 325 },
  // },
];
const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: false },
  { id: "e2-3", source: "2", target: "3", animated: false },
  { id: "e3-1", source: "1", target: "3", animated: false },
];

export { initialNodes, initialEdges };
