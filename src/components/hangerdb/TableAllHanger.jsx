import NewHangerForm from "./NewHangerForm";
import HangerDetailModal from "./HangerDetailModal";
import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { ToastContainer } from "react-toastify";
JavascriptTimeAgo.addLocale(en);

const API_URL = import.meta.env.VITE_API_URL_LOCAL;
const TableAllHanger = () => {
  const [hangerinfo, sethangerinfo] = useState([]);
  const [hangerDetails, sethangerDetails] = useState({});

  const ViewHangerDetails = (id) => {
    
    document.getElementById("hanger_details").showModal();

    axios
      .get(API_URL + "/getHangerByID?id="+id)
      .then((res) => {
        sethangerDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchHanger = () => {
    axios
      .get(API_URL + "/getAllHanger")
      .then((res) => {
        sethangerinfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchHanger();
  }, []);

  const data = useMemo(
    () =>
      hangerinfo.map((hangerinfo, index) => ({
        ...hangerinfo,
        index: index + 1,
        hc_insert_dt_taken: (
          <ReactTimeAgo
            date={new Date(hangerinfo.hc_insert_dt_taken)}
            locale="en-US"
          />
          
        ),
        hc_serial_no: hangerinfo.hc_serial_no !== "" ? hangerinfo.hc_serial_no : '--',

      })),
    [hangerinfo]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "index",
        header: "Index",
        size: 100,
      },
      {
        header: "Type",
        accessorKey: "hc_type",
      },
      {
        header: "Ident No",
        accessorKey: "hc_ident_no",
      },
      {
        header: "Serial No",
        accessorKey: "hc_serial_no",
      },
      {
        header: "Insert Date",
        accessorKey: "hc_insert_dt_taken",
      },
      {
        accessorKey: "hc_id",
        header: "Action",
        enableColumnFIlter: false,
        Cell: ({ cell }) => (
          <button
            className="btn btn-sm"
            onClick={() => ViewHangerDetails(cell.row.original.hc_id)}
          >
            View Details
          </button>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
  });

  return (
    <>
    <ToastContainer />
      <div className="card bg-base-300 shadow-md mt-10">
        <div className="card-body">
          <div className="grid grid-cols-2">
            <div className="col-span-1 flex items-center">
              <h2 className="card-title">All Hanger Information</h2>
            </div>
            <div className="col-span-1 flex justify-end">
              <NewHangerForm fetchHanger={fetchHanger}/>
            </div>
          </div>
          <div className="p-5">
            <MaterialReactTable table={table} />
            <HangerDetailModal hangerDetails={hangerDetails} fetchHanger={fetchHanger}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableAllHanger;
