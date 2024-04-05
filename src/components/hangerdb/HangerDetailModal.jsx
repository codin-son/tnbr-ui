import { useEffect, useState } from "react";
import axios from "axios";
import QrGenerated from "./QrGenerated";
import { toast, Slide } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL_LOCAL;

const HangerDetailModal = ({ hangerDetails, fetchHanger }) => {
  const [hangerState, setHangerState] = useState({
    hc_calibr_load: "",
    hc_com: "",
    hc_ident_no: "",
    hc_insert_dt_taken: "",
    hc_inspector: "",
    hc_operat_load: "",
    hc_serial_no: "",
    hc_spring_rate: "",
    hc_travel: "",
    hc_type: "",
    hanger_id: "",
    hc_update_dt_taken: "",
    isEdit: false,
  });

  useEffect(() => {
    if (hangerDetails) {
      const date = new Date(hangerDetails.hc_insert_dt_taken);
      const formattedDate = `${String(date.getDate()).padStart(
        2,
        "0"
      )} ${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()} ${String(date.getHours()).padStart(
        2,
        "0"
      )}:${String(date.getMinutes()).padStart(2, "0")}:${String(
        date.getSeconds()
      ).padStart(2, "0")}`;

      const updateDate = new Date(hangerDetails.hc_update_dt_taken);
      const formattedUpdateDate = `${String(updateDate.getDate()).padStart(
        2,
        "0"
      )} ${updateDate.toLocaleString("default", {
        month: "long",
      })} ${updateDate.getFullYear()} ${String(updateDate.getHours()).padStart(
        2,
        "0"
      )}:${String(updateDate.getMinutes()).padStart(2, "0")}:${String(
        updateDate.getSeconds()
      ).padStart(2, "0")}`;


      setHangerState((prevState) => ({
        ...prevState,
        hc_calibr_load: hangerDetails.hc_calibr_load || "--",
        hc_com: hangerDetails.hc_com || "--",
        hc_ident_no: hangerDetails.hc_ident_no || "--",
        hc_insert_dt_taken: formattedDate || "--",
        hc_inspector: hangerDetails.hc_inspector || "--",
        hc_operat_load: hangerDetails.hc_operat_load || "--",
        hc_serial_no: hangerDetails.hc_serial_no || "--",
        hc_spring_rate: hangerDetails.hc_spring_rate || "--",
        hc_travel: hangerDetails.hc_travel || "--",
        hc_type: hangerDetails.hc_type || "--",
        hanger_id: hangerDetails.hc_id || "--",
        hc_update_dt_taken: formattedUpdateDate || "--",
      }));
    }
  }, [hangerDetails]);

  const openDeleteModal = () =>{
    document.getElementById("delete_modal").showModal();
  }

  const deleteInfo = (id) => {
    axios.get(`${API_URL}/deleteHangerByID?id=${id}`).then((res) => {
      const details = document.getElementById("details_dropdown");
      details.removeAttribute("open");

      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
        transition: Slide,
      });
      fetchHanger();
      document.getElementById("delete_modal").close();
      document.getElementById("hanger_details").close();
    });
  };

  const editInfo = () => {
    const details = document.getElementById("details_dropdown");
    details.removeAttribute("open");
    setHangerState((prevState) => ({
      ...prevState,
      isEdit: true,
    }));
  };

  const cancelEdit = () => {
    setHangerState((prevState) => ({
      ...prevState,
      isEdit: false,
    }));
  };

  const submitEdit = () => {
    // get current datetime
    let date = new Date();
    date = date.toISOString();
    axios
      .post(`${API_URL}/updateHangerByID`, {
        hc_calibr_load: hangerState.hc_calibr_load,
        hc_com: hangerState.hc_com,
        hc_ident_no: hangerState.hc_ident_no,
        hc_inspector: hangerState.hc_inspector,
        hc_operat_load: hangerState.hc_operat_load,
        hc_serial_no: hangerState.hc_serial_no,
        hc_spring_rate: hangerState.hc_spring_rate,
        hc_travel: hangerState.hc_travel,
        hc_type: hangerState.hc_type,
        hanger_id: hangerState.hanger_id,
        hc_update_dt_taken: date,
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
          transition: Slide,
        });
        setHangerState((prevState) => ({
          ...prevState,
          isEdit: false,
        }));
        fetchHanger();
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
          transition: Slide,
        });
      });
  };

  return (
    <>
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            Delete Hanger Information
          </h3>
          <p className="py-4 text-center">
            Are You sure you want to delete this hanger information?
          </p>
          <div className="grid grid-row gap-2 mt-3">
            <button className="btn btn-warning btn-block" onClick={()=>deleteInfo(hangerState.hanger_id)}>Delete</button>
            <button className="btn btn-neutral btn-block" onClick={
              () => document.getElementById("delete_modal").close()
            }>Close</button>
          </div>
        </div>
      </dialog>
      <dialog id="hanger_details" className="modal">
        <div
          className={`modal-box w-11/12 max-w-5xl ${
            hangerState.isEdit ? "bg-base-300" : "bg-slate-50"
          }`}
        >
          <details
            id="details_dropdown"
            className="dropdown dropdown-end absolute right-5"
          >
            <summary
              tabIndex={0}
              className={`btn m-1 btn-circle ${
                hangerState.isEdit ? "btn-disabled" : ""
              }`}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </summary>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52 absolute"
            >
              <li className="mb-1">
                <a
                  onClick={() => {
                    editInfo();
                  }}
                >
                  Edit Hanger Information
                </a>
              </li>
              <li>
                <a
                  className="bg-red-600 text-white hover:bg-red-500"
                  onClick={() => {
                    
                    openDeleteModal();
                  }}
                >
                  Delete Information
                </a>
              </li>
            </ul>
          </details>
          <div className="p-2">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <h3
                  className={`font-bold text-2xl text-center ${
                    hangerState.isEdit ? "text-white" : "text-base-300"
                  }`}
                >
                  Hanger Information
                </h3>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="col-span-1 text-end">
                    <div className="badge badge-neutral">
                      Added: {hangerState.hc_insert_dt_taken}
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="badge badge-neutral">
                      Updated: {hangerState.hc_update_dt_taken}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12">
                {hangerState.isEdit ? (
                  <></>
                ) : (
                  <QrGenerated hc_ident_no={hangerState.hc_ident_no} />
                )}
              </div>
              <div className="col-span-12">
                <h3
                  className={`font-bold ${
                    hangerState.isEdit ? "text-white" : "text-base-300"
                  }`}
                >
                  Identification No.
                </h3>
                <div className="w-full bg-base-300 p-3 rounded-lg mt-2">
                  {hangerState.isEdit ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input w-full bg-white mt-2 text-black"
                      value={hangerState.hc_ident_no}
                      onChange={(e) =>
                        setHangerState((prevState) => ({
                          ...prevState,
                          hc_ident_no: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p className="text-white">{hangerState.hc_ident_no}</p>
                  )}
                </div>
              </div>
              <div className="col-span-6">
                <h3
                  className={`font-bold ${
                    hangerState.isEdit ? "text-white" : "text-base-300"
                  }`}
                >
                  Type.
                </h3>
                <div className="w-full bg-base-300 p-3 rounded-lg mt-2">
                  {hangerState.isEdit ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input w-full bg-white mt-2 text-black"
                      value={hangerState.hc_type}
                      onChange={(e) =>
                        setHangerState((prevState) => ({
                          ...prevState,
                          hc_type: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p className="text-white">{hangerState.hc_type}</p>
                  )}
                </div>
              </div>
              <div className="col-span-6">
                <h3
                  className={`font-bold ${
                    hangerState.isEdit ? "text-white" : "text-base-300"
                  }`}
                >
                  Serial No.
                </h3>
                <div className="w-full bg-base-300 p-3 rounded-lg mt-2">
                  {hangerState.isEdit ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input w-full bg-white mt-2 text-black"
                      value={hangerState.hc_serial_no}
                      onChange={(e) =>
                        setHangerState((prevState) => ({
                          ...prevState,
                          hc_serial_no: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p className="text-white">{hangerState.hc_serial_no}</p>
                  )}
                </div>
              </div>
              <div className="col-span-4">
                <h3
                  className={`font-bold ${
                    hangerState.isEdit ? "text-white" : "text-base-300"
                  }`}
                >
                  Calibr. Load
                </h3>
                <div className="w-full bg-base-300 p-3 rounded-lg mt-2">
                  {hangerState.isEdit ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input w-full bg-white mt-2 text-black"
                      value={hangerState.hc_calibr_load}
                      onChange={(e) =>
                        setHangerState((prevState) => ({
                          ...prevState,
                          hc_calibr_load: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p className="text-white">{hangerState.hc_calibr_load}</p>
                  )}
                </div>
              </div>
              <div className="col-span-4">
                <h3
                  className={`font-bold ${
                    hangerState.isEdit ? "text-white" : "text-base-300"
                  }`}
                >
                  Operat. Load
                </h3>
                <div className="w-full bg-base-300 p-3 rounded-lg mt-2">
                  {hangerState.isEdit ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input w-full bg-white mt-2 text-black"
                      value={hangerState.hc_operat_load}
                      onChange={(e) =>
                        setHangerState((prevState) => ({
                          ...prevState,
                          hc_operat_load: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p className="text-white">{hangerState.hc_operat_load}</p>
                  )}
                </div>
              </div>
              <div className="col-span-4">
                <h3
                  className={`font-bold ${
                    hangerState.isEdit ? "text-white" : "text-base-300"
                  }`}
                >
                  Travel
                </h3>
                <div className="w-full bg-base-300 p-3 rounded-lg mt-2">
                  {hangerState.isEdit ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input w-full bg-white mt-2 text-black"
                      value={hangerState.hc_travel}
                      onChange={(e) =>
                        setHangerState((prevState) => ({
                          ...prevState,
                          hc_travel: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p className="text-white">{hangerState.hc_travel}</p>
                  )}
                </div>
              </div>
              <div className="col-span-4">
                <h3
                  className={`font-bold ${
                    hangerState.isEdit ? "text-white" : "text-base-300"
                  }`}
                >
                  Spring Rate
                </h3>
                <div className="w-full bg-base-300 p-3 rounded-lg mt-2">
                  {hangerState.isEdit ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input w-full bg-white mt-2 text-black"
                      value={hangerState.hc_spring_rate}
                      onChange={(e) =>
                        setHangerState((prevState) => ({
                          ...prevState,
                          hc_spring_rate: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p className="text-white">{hangerState.hc_spring_rate}</p>
                  )}
                </div>
              </div>
              <div className="col-span-4">
                <h3
                  className={`font-bold ${
                    hangerState.isEdit ? "text-white" : "text-base-300"
                  }`}
                >
                  Com.
                </h3>
                <div className="w-full bg-base-300 p-3 rounded-lg mt-2">
                  {hangerState.isEdit ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input w-full bg-white mt-2 text-black"
                      value={hangerState.hc_com}
                      onChange={(e) =>
                        setHangerState((prevState) => ({
                          ...prevState,
                          hc_com: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p className="text-white">{hangerState.hc_com}</p>
                  )}
                </div>
              </div>
              <div className="col-span-4">
                <h3
                  className={`font-bold ${
                    hangerState.isEdit ? "text-white" : "text-base-300"
                  }`}
                >
                  Inspector
                </h3>
                <div className="w-full bg-base-300 p-3 rounded-lg mt-2">
                  {hangerState.isEdit ? (
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input w-full bg-white mt-2 text-black"
                      value={hangerState.hc_inspector}
                      onChange={(e) =>
                        setHangerState((prevState) => ({
                          ...prevState,
                          hc_inspector: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p className="text-white">{hangerState.hc_inspector}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {hangerState.isEdit ? (
            <button
              className="btn btn-primary btn-block mt-5"
              onClick={() => {
                submitEdit();
              }}
            >
              Submit
            </button>
          ) : (
            <></>
          )}
          <button
            className="btn btn-neutral btn-block mt-5"
            onClick={
              hangerState.isEdit
                ? cancelEdit
                : () => document.getElementById("hanger_details").close()
            }
          >
            {`${hangerState.isEdit ? "Cancel" : "Close"}`}
          </button>
        </div>
      </dialog>
    </>
  );
};

export default HangerDetailModal;
