import { useRef, useState, useEffect } from "react";
import * as ROSLIB from "roslib";
import GenerateReportBtn from "./GenerateReportBtn";

const HangerInfoPanel = ({ connected, setConnected, ros, canvasRefSmall }) => {
  const getScaledValSub = useRef(null);
  const getIdentIDSub = useRef(null);
  const [scaleVal, setScaleVal] = useState(0.0);
  const [identID, setIdentID] = useState("N/A");
  

  useEffect(() => {
    if (!connected) {
      console.log("tak connect");
      return;
    }
    setConnected(true);

    getScaledValSub.current = new ROSLIB.Topic({  
      ros: ros.current,
      name: "/get_scale_value",
      messageType: "std_msgs/Float32",
    });

    getScaledValSub.current.subscribe((msg) => {
      // set scale val decimal point to 2 
      setScaleVal(msg.data.toFixed(2));
    });

    getIdentIDSub.current = new ROSLIB.Topic({
      ros: ros.current,
      name: "/get_ident_id",
      messageType: "std_msgs/String",
    });
    getIdentIDSub.current.subscribe((msg) => {
      setIdentID(msg.data);
    });
  }, [connected]);
  return (
    <div className="card bg-base-300 me-4 ms-4">
      <div className="card-body">
        <h2 className="card-title justify-center">Hanger Information</h2>
        <div className="mt-3">
          <h3 className="font-bold">Hanger ID:</h3>
          <div className="w-full bg-white p-3 rounded-lg mt-2">
            <p className="text-base-100">{identID}</p>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="font-bold">Hanger Scale Value(mm):</h3>
          <div className="w-full bg-white p-3 rounded-lg mt-2">
            <p className="text-base-100">{scaleVal}</p>
          </div>
        </div>
        <div className="mt-3">
          <GenerateReportBtn canvasRefSmall={canvasRefSmall}scaleVal={scaleVal} identID={identID}/>
        </div>
      </div>
    </div>
  );
};

export default HangerInfoPanel;
