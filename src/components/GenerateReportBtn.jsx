const GenerateReportBtn = ({ canvasRefSmall, identID, scaleVal }) => {
  const handleGenerate = () => {
    const imgDataUrlNormal = canvasRefSmall.current.toDataURL("image/jpeg", 1);
    const imgReport = imgDataUrlNormal.replace(/^data:image\/jpg;base64,/, "");
    const imgData = [imgReport, identID, scaleVal];
    localStorage.setItem(`imgSnapshot`, JSON.stringify(imgData));
    window.open("/generatereport", "_blank");
  };
  return (
    <>
      <button className="btn btn-primary btn-block" onClick={handleGenerate}>
        Generate Report
      </button>
    </>
  );
};

export default GenerateReportBtn;
