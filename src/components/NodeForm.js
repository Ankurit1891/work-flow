import React from "react";
import "./Modal.css";

const NodeForm = () => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => {}}>❌</button>
        </div>
        <div className="title">
          <h1>Node Name</h1>
        </div>
        <div
          className="body"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>
            <label htmlFor="name" style={{ margin: "10px" }}>
              Property 1: <input type="text" />
            </label>
            <label htmlFor="name">
              Property 2: <input type="text" />
            </label>
          </div>
          <div>
            <label htmlFor="name" style={{ margin: "10px" }}>
              Property 1: <input type="text" />
            </label>
            <label htmlFor="name">
              Property 2: <input type="text" />
            </label>
          </div>
          <div>
            <label htmlFor="name" style={{ margin: "10px" }}>
              Property 1: <input type="text" />
            </label>
            <label htmlFor="name">
              Property 2: <input type="text" />
            </label>
          </div>
          <div>
            <label htmlFor="name" style={{ margin: "10px" }}>
              Property 1: <input type="text" />
            </label>
            <label htmlFor="name">
              Property 2: <input type="text" />
            </label>
          </div>
          <div>
            <label htmlFor="name" style={{ margin: "10px" }}>
              Property 1: <input type="text" />
            </label>
            <label htmlFor="name">
              Property 2: <input type="text" />
            </label>
          </div>
          <div>
            <label htmlFor="name" style={{ margin: "10px" }}>
              Property 1: <input type="text" />
            </label>
            <label htmlFor="name">
              Property 2: <input type="text" />
            </label>
          </div>
          <div>
            <label htmlFor="name" style={{ margin: "10px" }}>
              Property 1: <input type="text" />
            </label>
            <label htmlFor="name">
              Property 2: <input type="text" />
            </label>
          </div>
        </div>
        <div className="footer">
          <button onClick={() => {}} id="cancelBtn">
            Cancel
          </button>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default NodeForm;
