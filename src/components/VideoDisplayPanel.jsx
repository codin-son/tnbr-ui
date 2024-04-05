import { useRef, useEffect, useState } from "react";
const VideoDisplayPanel = ({canvasRefSmall}) => {
  const imageSmall = new Image();
  imageSmall.crossOrigin = "anonymous";
  const [urlSmall, setUrlSmall] = useState(
    "http://localhost:8082/stream?topic=/travel_margin"
  );
  useEffect(() => {
    if (canvasRefSmall.current.getContext("2d") === null) {
      return;
    }

    const context = canvasRefSmall.current.getContext("2d");
    let timeoutId;
    let imageLoaded = false;
    let retryCount = 0;
    const maxRetries = 5; // Maximum number of retry attempts
    const retryDelay = 3000; // Delay between retries in milliseconds

    const loadImage = () => {
      if (retryCount < maxRetries) {
        context.clearRect(
          0,
          0,
          canvasRefSmall.current.width,
          canvasRefSmall.current.height
        );
        imageSmall.src = ""; // Clear the previous image source
        imageSmall.src = urlSmall; // Attempt to reload the image
        retryCount++;
      } else {
        console.error(
          "Failed to load the image after " + maxRetries + " attempts."
        );
      }
    };

    imageSmall.onload = () => {
      imageLoaded = true;
      const cw = canvasRefSmall.current.width;
      const ch = canvasRefSmall.current.height;
      context.clearRect(0, 0, cw, ch);
      if (imageSmall.complete && imageSmall.naturalWidth !== 0) {
        context.drawImage(imageSmall, 0, 0, cw, ch);
      } else if (imageSmall.naturalWidth !== 0) {
        console.log("image gone");
      }
    };
    imageSmall.onerror = () => {
      console.error(
        "Failed to load image. Retrying in " + retryDelay + "ms..."
      );
      timeoutId = setTimeout(loadImage, retryDelay);
    };

    loadImage(); // Initial image load attempt

    const canvasInterval = setInterval(() => {
      if (imageLoaded) {
        const cw = canvasRefSmall.current.width;
        const ch = canvasRefSmall.current.height;
        context.clearRect(0, 0, cw, ch);
        if (imageSmall.complete && imageSmall.naturalWidth !== 0) {
          context.drawImage(imageSmall, 0, 0, cw, ch);
        } else if (imageSmall.naturalWidth !== 0) {
          console.log("image gone");
        }
      }
    }, 10);

    return () => {
      clearInterval(canvasInterval);
      clearTimeout(timeoutId);
      imageSmall.src = "";
    };
  }, [urlSmall]); // Added urlSmall as a dependency to useEffect to react to URL changes

  return (
    <div>
      <canvas
        className="rounded-xl"
        width={1280}
        height={720}
        ref={canvasRefSmall}
      ></canvas>
      <div className="mt-4 w-full flex justify-end">
      </div>
    </div>
  );
};

export default VideoDisplayPanel;
