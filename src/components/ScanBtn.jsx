import { useRef,useState, useEffect } from "react";
import * as ROSLIB from "roslib";
const ScanBtn = ({connected,setConnected,ros}) => {
  const lockQrPub = useRef(null);
  const isLockQrSub = useRef(null);
  const [startLockQr, setStartLockQr] = useState(false);
  useEffect(()=>{
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        if(startLockQr){
          handleStopLockQR();
        }else{
          handleStartLockQR();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  })
  useEffect(()=>{
    if(!connected){
      console.log("tak connect");
      return;
    }
    setConnected(true);


    lockQrPub.current = new ROSLIB.Topic({
      ros: ros.current,
      name: "/lock_qr_sub",
      messageType: "std_msgs/Bool",
    });
    isLockQrSub.current = new ROSLIB.Topic({
      ros: ros.current,
      name: "/is_lock_qr",
      messageType: "std_msgs/Bool",
    });
    isLockQrSub.current.subscribe((msg) => {
      console.log(msg.data);
      setStartLockQr(msg.data);
    });


  })

  const handleStartLockQR = () => {
    const lockQrMsg = new ROSLIB.Message({
      data: true,
    });
    lockQrPub.current.publish(lockQrMsg);
    setStartLockQr(true);
  }
  const handleStopLockQR = () => {
    const lockQrMsg = new ROSLIB.Message({
      data: false,
    });
    lockQrPub.current.publish(lockQrMsg);
    setStartLockQr(false);
  }
  return (
    <div className="card bg-base-300 mx-4 mt-4">
      <div className="card-body">
        <h2 className="card-title justify-center">Hanger Identifaction Finder</h2>
        {startLockQr?(
                  <div className="mt-3">
                  <button className="btn btn-block btn-neutral" onClick={handleStopLockQR}>Clear Hanger ID</button>
              </div>
        ):(
                  <div className="mt-3">
                  <button className="btn btn-block btn-primary" onClick={handleStartLockQR}>Lock Hanger ID</button>
              </div>
        )}
      </div>
    </div>
  );
};

export default ScanBtn;


