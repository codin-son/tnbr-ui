import { useRef,useState, useEffect } from "react";
import * as ROSLIB from "roslib";

const SwapCamBtn = ({connected,setConnected,ros}) => {

    const swapCamPub = useRef(null);
    const [isSwap, setIsSwap] = useState(true);
    useEffect(()=>{
        if(!connected){
            console.log("tak connect");
            return;
        }
        setConnected(true);

        swapCamPub.current = new ROSLIB.Topic({
            ros: ros.current,
            name: "/swap_cam",
            messageType: "std_msgs/Bool",
        });
    })

    const handleSwapCam = () => {
        if(isSwap){
            const startSwpMsg =  new ROSLIB.Message({
                data: false,
            });
            swapCamPub.current.publish(startSwpMsg);
            setIsSwap(false);
        }else{
            const startSwpMsg =  new ROSLIB.Message({
                data: true,
            });
            swapCamPub.current.publish(startSwpMsg);
            setIsSwap(true);
        }
    }

  return <button className="btn btn-primary" onClick={handleSwapCam}>Swap Camera Mode</button>;
};

export default SwapCamBtn;
