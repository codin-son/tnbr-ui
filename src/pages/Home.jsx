import Navbar from "../components/Navbar";
import VideoDisplayPanel from "../components/VideoDisplayPanel";
import HangerInfoPanel from "../components/HangerInfoPanel";
import ScanBtn from "../components/ScanBtn";
import MediaPanel from "../components/MediaPanel";
import { useRef} from "react";
const Home = ({connected,setConnected,ros}) => {
    const canvasRefSmall = useRef(null);
  return (
    <>
      <div className="bg-base-100">
        <Navbar connected={connected} setConnected={setConnected} ros={ros} />
        <div className="w-full">
          <div className="grid grid-cols-12 gap-4 mt-4 ms-4">
            <div className="col-span-8">
              <VideoDisplayPanel
                connected={connected}
                setConnected={setConnected}
                ros={ros}
                canvasRefSmall={canvasRefSmall}
              />
            </div>
            <div className="col-span-4">
              <HangerInfoPanel
                connected={connected}
                setConnected={setConnected}
                ros={ros}
                canvasRefSmall={canvasRefSmall}
              />
              <MediaPanel canvasRefSmall={canvasRefSmall} />
              <ScanBtn
                connected={connected}
                setConnected={setConnected}
                ros={ros}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
