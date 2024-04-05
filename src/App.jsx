import "./App.css";
import * as ROSLIB from "roslib";
import { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GenerateReport from "./pages/GenerateReport";
import HangerDB from "./pages/HangerDB";
function App() {
  const ros = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (ros.current) {
      return;
    }

    const connectToRos = () => {
      ros.current = new ROSLIB.Ros({ url: "ws://localhost:8083" });

      ros.current.on("error", function (error) {
        setConnected(false);
      });

      ros.current.on("connection", function () {
        setConnected(true);
      });

      ros.current.on("close", function () {
        setConnected(false);
        setTimeout(connectToRos, 10000);
      });
    };

    connectToRos();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home ros={ros} connected={connected} setConnected={setConnected} />
        }
      />
      <Route path="/generatereport" element={<GenerateReport />} />
      <Route path="/hangerdb" element={<HangerDB />} />
    </Routes>
  );
}

export default App;
