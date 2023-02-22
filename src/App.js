import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import FileManager from "./pages/FileManager";
import SideBar from "./components/SideBar";
import Canvas from "./pages/Canvas";
// import EdgeModalForm from "./components/EdgeModalForm";

function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard></Dashboard>} />
          <Route exact path="/analytics" element={<Analytics></Analytics>} />
          <Route
            exact
            path="/filemanager"
            element={<FileManager></FileManager>}
          />
          <Route exact path="/canvas" element={<Canvas></Canvas>} />
          {/* <Route
            exact
            path="/canvas"
            element={<EdgeModalForm></EdgeModalForm>}
          /> */}
        </Routes>
      </SideBar>
    </Router>
    // <NodeForm />
  );
}

export default App;
