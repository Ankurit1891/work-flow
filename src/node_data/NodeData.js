import { VscDebugStart } from "react-icons/vsc";
import React from "react";
const initialNodes = [
  {
    id: "0",
    key: "0",
    name: "start",
    type: "input",
    description: "initial state",
    color: "white",
    data: {
      label: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "wrap",
            width: "wrap",
            maxWidth: "170px",
            border: "1px solid white",
            backgroundColor: "#656ac6",
            borderRadius: "5px",
            margin: "-5px",
            padding: "10px",
            paddingBottom: "7px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span
              style={{
                color: "white",
                marginRight: "10px",
                marginTop: "-2px",
              }}
            >
              <VscDebugStart />
            </span>
            <div
              style={{ color: "white", fontWeight: "600", textAlign: "left" }}
            >
              <i>START</i>
            </div>
          </div>
          <br />
          <div style={{ textAlign: "left" }}>
            <span
              style={{
                color: "white",
                fontWeight: "300",
                textAlign: "left",
                fontSize: "9px",
              }}
            ></span>
          </div>
        </div>
      ),
    },
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
