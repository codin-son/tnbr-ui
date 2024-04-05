import { useRef, useEffect } from "react";
import * as ROSLIB from "roslib";

const CalibrateModal = ({ connected, setConnected, ros }) => {
  const recalibratePub = useRef(null);
  const realScalePub = useRef(null);

  useEffect(() => {
    if (!connected) {
      console.log("tak connect");
      return;
    }
    setConnected(true);

    recalibratePub.current = new ROSLIB.Topic({
      ros: ros.current,
      name: "/recalibrate",
      messageType: "std_msgs/Bool",
    });
    realScalePub.current = new ROSLIB.Topic({
      ros: ros.current,
      name: "/real_scale",
      messageType: "std_msgs/Float32",
    });
  }, [connected]);

  const submitCalibrate = () => {
    const recalibMsg = new ROSLIB.Message({
      data: true,
    });
    const realValue = document.querySelector("#calibrate-input").value;
    const realScaleMsg = new ROSLIB.Message({
      data: parseFloat(realValue),
    });
    realScalePub.current.publish(realScaleMsg);
    recalibratePub.current.publish(recalibMsg);
    // close modal for id calibrate-panel
    document.getElementById("calibrate-panel").close();
  };

  return (
    <>
      <a
        className="btn btn-neutral me-2"
        onClick={() => document.getElementById("calibrate-panel").showModal()}
      >
        Calibrate Measurement
      </a>
      <dialog id="calibrate-panel" className="modal modal-bottom">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center mb-4">
            Calibrate Measurement
          </h3>
          <p className="mb-4">Enter Real Measurement Value(mm):</p>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Real Measurement"
              className="input input-bordered w-full mb-4"
              id="calibrate-input"
            />
            <button className="btn btn-primary" onClick={submitCalibrate}>
              Recalibrate
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CalibrateModal;
