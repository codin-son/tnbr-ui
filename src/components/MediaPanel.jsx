import { saveAs } from "file-saver";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const MediaPanel = ({ canvasRefSmall }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null); // Create a ref for mediaRecorder
  let videoStream = null;
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "KeyQ") {
        
        downloadImage();
      }else if(event.code === "KeyE"){
        if (!isRecording) {
          setIsRecording(true);
          mediaRecorderRef.current.start();
        } else {
          setIsRecording(false);
          mediaRecorderRef.current.stop();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRecording]);

  useEffect(() => {
    let chunks = []; // Declare chunks as an empty array

    videoStream = canvasRefSmall.current.captureStream(30);
    mediaRecorderRef.current = new MediaRecorder(videoStream, {
      videoBitsPerSecond: 5000000,
      mimeType: "video/webm;codecs=vp9",
    });

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    mediaRecorderRef.current.onstop = function (e) {
      const blob = new Blob(chunks, { type: "video/mp4" });
      chunks = [];
      saveAs(blob, "video.mp4");
    };

    return () => {};
  }, [canvasRefSmall.current]);
  const downloadImage = () => {
    const imgDataUrlNormal = canvasRefSmall.current.toDataURL("image/jpeg", 1);
    const date = new Date();
    let name = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.jpg`;
    fetch(imgDataUrlNormal).then((r) => {
      r.blob().then((blob) => {
        saveAs(blob, name);
      });
    });
  };

  return (
    <div className="card bg-base-300 mx-4 mt-4">
      <div className="card-body">
        <h2 className="card-title justify-center">Media Utility Panel</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="btn btn-block btn-primary" onClick={downloadImage}>
            Snapshot
          </button>
          <button
            className={`btn btn-block ${
              isRecording ? "btn-error" : "btn-primary"
            }`}
            onClick={() => {
              if (!isRecording) {
                setIsRecording(true);
                mediaRecorderRef.current.start();
              } else {
                setIsRecording(false);
                mediaRecorderRef.current.stop();
              }
            }}
          >
            Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaPanel;
