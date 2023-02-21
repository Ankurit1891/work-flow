import React from "react";
import "./Modal.css";
import { motion } from "framer-motion";
function Modal({ setOpenModal, setOpenFormModal }) {
  return (
    <div className="modalBackground">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="modalContainer"
      >
        <div className="titleCloseBtn">
          <motion.button
            initial={{
              rotate: 0,
            }}
            whileHover={{
              rotate: +90,
            }}
            onClick={() => {
              setOpenModal(false);
              setOpenFormModal(false);
            }}
          >
            ❌
          </motion.button>
        </div>
        <div className="title">
          <h1>Node Name</h1>
        </div>
        <div className="body">
          <p>Listing all the properties of the node</p>
        </div>
        <div className="footer">
          <motion.button
            initial={{
              rotate: 0,
            }}
            transition={{ duration: 0.1 }}
            whileHover={{
              backgroundColor: "black",
              scale: 1.1,
            }}
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Modal;
