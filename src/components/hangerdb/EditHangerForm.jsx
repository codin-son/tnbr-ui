import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL_LOCAL;
const EditHangerForm = ({ hangerDetails }) => {
  const second = "";
  const [hc_calibr_load, sethc_calibr_load] = useState("");
  const [hc_com, sethc_com] = useState(second);
  const [hc_ident_no, sethc_ident_no] = useState(second);
  const [hc_insert_dt_taken, sethc_insert_dt_taken] = useState(second);
  const [hc_inspector, sethc_inspector] = useState(second);
  const [hc_operat_load, sethc_operat_load] = useState(second);
  const [hc_serial_no, sethc_serial_no] = useState(second);
  const [hc_spring_rate, sethc_spring_rate] = useState(second);
  const [hc_travel, sethc_travel] = useState(second);
  const [hc_type, sethc_type] = useState(second);
  const [hanger_id, sethanger_id] = useState(second);

  useEffect(() => {
    if (hangerDetails) {
      let date = new Date(hangerDetails.hc_insert_dt_taken);

      let day = String(date.getDate()).padStart(2, "0");
      let monthIndex = date.getMonth();
      let year = date.getFullYear();

      let hours = String(date.getHours()).padStart(2, "0");
      let minutes = String(date.getMinutes()).padStart(2, "0");
      let seconds = String(date.getSeconds()).padStart(2, "0");

      let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      let formattedDate = `${day} ${monthNames[monthIndex]} ${year} ${hours}:${minutes}:${seconds}`;

      sethc_calibr_load(
        hangerDetails.hc_calibr_load !== ""
          ? hangerDetails.hc_calibr_load
          : "--"
      );
      sethc_com(hangerDetails.hc_com !== "" ? hangerDetails.hc_com : "--");
      sethc_ident_no(
        hangerDetails.hc_ident_no !== "" ? hangerDetails.hc_ident_no : "--"
      );
      sethc_insert_dt_taken(formattedDate !== "" ? formattedDate : "--");
      sethc_inspector(
        hangerDetails.hc_inspector !== "" ? hangerDetails.hc_inspector : "--"
      );
      sethc_operat_load(
        hangerDetails.hc_operat_load !== ""
          ? hangerDetails.hc_operat_load
          : "--"
      );
      sethc_serial_no(
        hangerDetails.hc_serial_no !== "" ? hangerDetails.hc_serial_no : "--"
      );
      sethc_spring_rate(
        hangerDetails.hc_spring_rate !== ""
          ? hangerDetails.hc_spring_rate
          : "--"
      );
      sethc_travel(
        hangerDetails.hc_travel !== "" ? hangerDetails.hc_travel : "--"
      );
      sethc_type(hangerDetails.hc_type !== "" ? hangerDetails.hc_type : "--");
      sethanger_id(hangerDetails.hc_id !== "" ? hangerDetails.hc_id : "--");
    }
  }, [hangerDetails]);

  const submitEdit = () =>{
    const data = {
      hc_calibr_load,
      hc_com,
      hc_ident_no,
      hc_insert_dt_taken,
      hc_inspector,
      hc_operat_load,
      hc_serial_no,
      hc_spring_rate,
      hc_travel,
      hc_type,
      hanger_id
    }
    axios.put(`${API_URL}/hangerdb/update`, data)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }
  return (
    <>
      <dialog id="editForm" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-base-200">
          <div className="p-2">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <h3 className="font-bold text-lg text-center text-white">
                  Edit Hanger Information
                </h3>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="col-span-1 text-end">
                    <div className="badge badge-neutral">Added: {hc_insert_dt_taken}</div>
                  </div>
                  <div className="col-span-1">
                    <div className="badge badge-neutral">Updated: {hc_insert_dt_taken}</div>
                  </div>
                </div>
              </div>
              <div className="col-span-6">
                <h3 className="font-bold text-white">Identification No.</h3>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input w-full bg-white mt-2 text-black"
                    value={hc_ident_no}
                    onChange={e => sethc_ident_no(e.target.value)}
                />
              </div>
              <div className="col-span-6">
                <h3 className="font-bold text-white">
                  Hanger Data Entry Date Taken
                </h3>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input w-full bg-white mt-2 text-black"
                  value={hc_insert_dt_taken}
                />
              </div>
              <div className="col-span-6">
                <h3 className="font-bold text-white">Type.</h3>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input w-full bg-white mt-2 text-black"
                  value={hc_type}
                />
              </div>
              <div className="col-span-6">
                <h3 className="font-bold text-white">Serial No.</h3>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input w-full bg-white mt-2 text-black"
                  value={hc_serial_no}
                />
              </div>
              <div className="col-span-4">
                <h3 className="font-bold text-white">Calibr. Load</h3>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input w-full bg-white mt-2 text-black"
                  value={hc_calibr_load}
                />
              </div>
              <div className="col-span-4">
                <h3 className="font-bold text-white">Operat. Load</h3>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input w-full bg-white mt-2 text-black"
                  value={hc_operat_load}
                />
              </div>
              <div className="col-span-4">
                <h3 className="font-bold text-white">Travel</h3>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input w-full bg-white mt-2 text-black"
                  value={hc_travel}
                />
              </div>
              <div className="col-span-4">
                <h3 className="font-bold text-white">Spring Rate</h3>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input w-full bg-white mt-2 text-black"
                  value={hc_spring_rate}
                />
              </div>
              <div className="col-span-4">
                <h3 className="font-bold text-white">Com.</h3>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input w-full bg-white mt-2 text-black"
                  value={hc_com}
                />
              </div>
              <div className="col-span-4">
                <h3 className="font-bold text-white">Inspector</h3>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input w-full bg-white mt-2 text-black"
                  value={hc_inspector}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-block mt-5" onClick={()=>{submitEdit}}>Submit</button>
          <button
            className="btn btn-neutral btn-block mt-2"
            onClick={() => document.getElementById("editForm").close()}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </>
  );
};

export default EditHangerForm;
