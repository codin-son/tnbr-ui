import QRCode from "react-qr-code";
const QrGenerated = ({hc_ident_no}) => {
    const downloadQR = () =>{
        const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QRCode_${hc_ident_no}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  
    }
  return (
    <>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 100,
          width: "100%",
          background:"white"
        }}
      >
        <QRCode
        id="QRCode"
          size={500}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={hc_ident_no}
          viewBox={`0 0 500 500`}
          bgColor={'#FFFFFF'}
          title={hc_ident_no}
        />
      </div>
      <div className="flex justify-center mt-2">
        <button className="btn btn-primary btn-sm" onClick={()=>{
            downloadQR()
        }}>Download QR</button>
      </div>
    </>
  );
};

export default QrGenerated;
