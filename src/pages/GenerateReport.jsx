import {
  PDFViewer,
  Page,
  View,
  Text,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useEffect,useState } from "react";
const GenerateReport = () => {
  const titlename = "report";
  // get date
  const date = new Date();
  const savedTime = date.toDateString();
  // get time
  const time = date.toLocaleTimeString();
  const [imageData, setImageData] = useState("");
  const [ scaleVal, setScaleVal] = useState(0);
  const [identID, setIdentID] = useState("H-14E/6A1G1/X6A200A");

  useEffect(()=>{
    // get data from localstorage with key imgSnapshot
    const imgSnapshot = JSON.parse(localStorage.getItem("imgSnapshot"));
    setImageData(imgSnapshot ? imgSnapshot[0] : "");
    setIdentID(imgSnapshot ? imgSnapshot[1] : 0);
    setScaleVal(imgSnapshot ? imgSnapshot[2] : "H-14E/6A1G1/X6A200A");
  },[])
  const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 0,
      margin: "20px",
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
      maxHeight: "200px",
      paddingVertical: 10,

      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
    },
    tableCol: {
      width: "25%",
    },
    tableCol2: {
      width: "50%",
    },
    tableCol3: {
      width: "33.333333333%",
    },
    tableCell: {
      margin: "auto",
      fontSize: 10,
    },
    rowTitle: {
      fontSize: 26,
      fontWeight: "bold",
      margin: "auto",
    },
    textLeft: {
      textAlign: "left",
    },
    imageStyle: {
      maxWidth: "300px",
      maxHeight: "400px",
      padding: "10px",
    },
    logoStyle: {
      maxWidth: "100px",
      maxHeight: "100px",
      padding: "10px",
    },
    tagCenter: {
      alignSelf: "center",
    },
    boldText: {
      fontWeight: "bold",
    },
  });
  const PdfDoc = () => (
    <PDFViewer className="h-screen w-screen">
      <Document title={titlename}>
        <Page style={styles.body}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCol, { width: "100%" }]}>
                <Text style={{ ...styles.tableCell, ...styles.rowTitle }}>
                  {"Hanger Scale Measurement Operation Report"}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>Date:</Text>
                <Text style={{ ...styles.tableCell, ...styles.boldText }}>
                  {savedTime}
                </Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>Time:</Text>
                <Text style={{ ...styles.tableCell, ...styles.boldText }}>
                  {time}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>Ident. No.:</Text>
                <Text style={{ ...styles.tableCell, ...styles.boldText }}>
                  {identID}
                </Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>Scale Value:</Text>
                <Text style={{ ...styles.tableCell, ...styles.boldText }}>
                  {scaleVal}mm
                </Text>
              </View>
            </View>
            {imageData ? (
                  <View style={{ ...styles.tableRow, ...styles.tagCenter }}>
                    <View style={[styles.tableCol, { width: "100%" }]}>
                      <Image
                        style={{
                          ...styles.imageStyle,
                          ...styles.tagCenter,
                          ...styles.tableCell,
                        }}
                        src={imageData}
                      />
                    </View>
                  </View>
                ) : (
                  <></>
                )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
  return (
    <>
      <PdfDoc />
    </>
  );
};

export default GenerateReport;
