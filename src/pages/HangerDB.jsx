import Navbar from "../components/hangerdb/Navbar";
import TableAllHanger from "../components/hangerdb/TableAllHanger";
const HangerDB = () => {
  return (
    <>
      <Navbar/>
      <div className="container mx-auto">
        <div className="">
          <TableAllHanger/>
        </div>
      </div>
    </>
  );
};

export default HangerDB;
