// import React, { useState } from "react";
// import "./EdgeModalForm.css";
// import "./NodeForm.css";
// import { TextField } from "@fluentui/react/lib/TextField";
import { motion } from "framer-motion";

// const EdgeModalForm = ({ edge, setEdgeOpenFormModal, alterEdge }) => {
//   const edgeFormAcceptHandler = () => {
//     setEdgeOpenFormModal(false);
//     alterEdge(text, description, edge.id);
//   };

//   const [text, setText] = useState("");
//   const [description, setDescription] = useState("");
//   const onChangeHandlerName = (e) => {
//     setText(e.target.value);
//   };
//   const onChangeHandlerDescription = (e) => {
//     setDescription(e.target.value);
//   };

//   return (
//     <div className="modalBackground">
//       <motion.div
//         className="modalContainer"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         <div className="titleCloseBtn">
//           <motion.button
//             initial={{
//               rotate: 0,
//             }}
//             whileHover={{
//               rotate: +90,
//             }}
//             onClick={() => {
//               setEdgeOpenFormModal(false);
//             }}
//           >
//             ❌
//           </motion.button>
//         </div>
//         <div className="heading-container">
//           <span
//             className="icon-container"
//             // style={{ color: nodeBackgroundColor }}
//           >
//             {/* {nodeIcon} */}
//           </span>
//           <span
//             className="text-container"
//             // style={{ boxShadow: `2px 2px 10px ${nodeBackgroundColor}` }}
//           >
//             {/* <i>{nodeName}</i> */}
//             Transition
//           </span>
//         </div>
//         <div
//           className="body"
//           style={{ display: "flex", flexDirection: "column" }}
//         >
//           <TextField
//             label="transition Name"
//             placeholder="Enter the transition name"
//             onChange={onChangeHandlerName}
//             value={text}
//           />
//           <br />
//           <TextField
//             placeholder="Description..."
//             style={{
//               width: "fit-content",
//               minWidth: "400px",
//               minHeight: "70px",
//             }}
//             label="Description of the transition"
//             onChange={onChangeHandlerDescription}
//             value={description}
//             multiline
//             autoAdjustHeight
//           />
//           <div className="footer">
//             <motion.button
//               initial={{
//                 rotate: 0,
//               }}
//               transition={{ duration: 0.1 }}
//               whileHover={{
//                 backgroundColor: "#0a0a0a",
//                 scale: 1.1,
//               }}
//               onClick={() => {
//                 setEdgeOpenFormModal(false);
//               }}
//               id="cancelBtn"
//             >
//               Close
//             </motion.button>
//             <motion.button
//               initial={{
//                 rotate: 0,
//               }}
//               transition={{ duration: 0.1 }}
//               whileHover={{
//                 backgroundColor: "#0a0a0a",
//                 scale: 1.1,
//               }}
//               onClick={edgeFormAcceptHandler}
//               id="acceptBtn"
//             >
//               Confirm
//             </motion.button>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default EdgeModalForm;

import React, { useState } from "react";

import { TextField } from "@fluentui/react/lib/TextField";
import {
  makeStyles,
  getTheme,
  mergeStyleSets,
  FontWeights,
  Modal,
} from "@fluentui/react";
import {
  DefaultButton,
  PrimaryButton,
  IconButton,
} from "@fluentui/react/lib/Button";

const EdgeModalForm = ({ edge, setEdgeOpenFormModal, alterEdge }) => {
  const edgeFormAcceptHandler = () => {
    setEdgeOpenFormModal(false);
    alterEdge(text, description, edge.id);
  };

  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const onChangeHandlerName = (e) => {
    setText(e.target.value);
  };
  const onChangeHandlerDescription = (e) => {
    setDescription(e.target.value);
  };

  const buttonClasses = buttonStyles();
  const inputClasses = useStyles();

  return (
    <motion.div>
      <Modal
        isOpen={true}
        onDismiss={() => {
          setEdgeOpenFormModal(false);
        }}
        isBlocking={false}
        containerClassName={contentStyles.container}
      >
        <div className={contentStyles.header}>
          <h2 className={contentStyles.heading}>TRANSITION</h2>
          <IconButton
            styles={iconButtonStyles}
            iconProps={{ iconName: "Cancel" }}
            title="Cancel"
            ariaLabel="Cancel"
            onClick={() => {
              setEdgeOpenFormModal(false);
            }}
          />
        </div>
        <div className={contentStyles.body}>
          <TextField
            onChange={onChangeHandlerName}
            value={text}
            className={inputClasses.stateName}
            label="Transition Name"
            style={{
              fontWeight: "400",
            }}
            placeholder="Enter transition name  here"
          />
          <TextField
            onChange={onChangeHandlerDescription}
            value={description}
            className={inputClasses.stateDescription}
            label="Transition Description"
            placeholder="Enter transition description  here"
          />
        </div>
        <div
          style={{ display: "flex", padding: "20px", justifyContent: "end" }}
        >
          <DefaultButton
            className={buttonClasses.cancel}
            text="CANCEL"
            onClick={() => {
              setEdgeOpenFormModal(false);
            }}
            allowDisabledFocus
          />
          <PrimaryButton
            className={buttonClasses.confirm}
            text="CONFIRM"
            onClick={edgeFormAcceptHandler}
            allowDisabledFocus
          />
        </div>
      </Modal>
    </motion.div>
  );
};

const useStyles = makeStyles({
  stateName: {
    width: "200px",
  },
  stateDescription: {
    width: "400px",
  },
});

const buttonStyles = makeStyles({
  confirm: {
    color: "#ffffff",
    backgroundColor: "#0a8cfa",
    marginLeft: "9px",
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "green", // Change the background color on hover to dark blue
      color: "white", // Change the text color on hover to white
    },
  },
  cancel: {
    backgroundColor: "white",
    color: "black",
    marginLeft: "9px",
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "red", // Change the background color on hover to dark blue
      color: "white", // Change the text color on hover to white
    },
  },
});

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    width: "50%",
    fontSize: "27px ",
  },
  header: [
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.purpleDark}`,
      color: theme.palette.black,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  heading: {
    color: "black",
    fontWeight: FontWeights.semibold,
    fontSize: "inherit",
    margin: "0",
  },
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: { margin: "14px 0" },
      "p:first-child": { marginTop: 0 },
      "p:last-child": { marginBottom: 0 },
    },
  },
});

const iconButtonStyles = {
  root: {
    color: "black",
    fontWeight: "100",
    backgroundColor: "white",
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
    "&:hover": {
      backgroundColor: "grey",
      color: "black",
    },
  },
};
export default EdgeModalForm;
