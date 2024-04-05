import { useRef } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL_LOCAL;
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewHangerForm = ({fetchHanger}) => {
  const typeRef = useRef();
  const serialRef = useRef();
  const calibrRef = useRef();
  const operatRef = useRef();
  const travelRef = useRef();
  const springRef = useRef();
  const comRef = useRef();
  const inspectorRef = useRef();
  const identRef = useRef();

  const cancelSubmit = () => {
    document.getElementById("new_hanger_form").close();
  };

  const handleSubmit = async () => {
    if (identRef.current.value != "") {
      let currentDateTime = new Date();
      currentDateTime = currentDateTime.toISOString();
      const hangerData = {
        hc_type: typeRef.current.value,
        hc_serial_no: serialRef.current.value,
        hc_calibr_load: calibrRef.current.value,
        hc_operat_load: operatRef.current.value,
        hc_travel: travelRef.current.value,
        hc_spring_rate: springRef.current.value,
        hc_com: comRef.current.value,
        hc_inspector: inspectorRef.current.value,
        hc_ident_no: identRef.current.value,
        hc_insert_dt_taken: currentDateTime,
      };
      try {
        const response = await axios.post(
          API_URL + "/add_hanger_cert",
          hangerData
        ).then(()=>{
          fetchHanger();
        });
        toast.success("New Hanger Data Added", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
          transition: Slide,
        });
        document.getElementById("new_hanger_form").close();
        typeRef.current.value = "";
        serialRef.current.value = "";
        calibrRef.current.value = "";
        operatRef.current.value = "";
        travelRef.current.value = "";
        springRef.current.value = "";
        comRef.current.value = "";
        inspectorRef.current.value = "";
        identRef.current.value = "";
      } catch (error) {
        toast.error("Hanger Identification Already Exist", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
          transition: Slide,
        });
      }
    } else {
      alert("Please enter Ident. No.");
    }
  };
  return (
    <>
      <button
        className="btn btn-primary btn-md"
        onClick={() => document.getElementById("new_hanger_form").showModal()}
      >
        Add New Hanger Data
      </button>
      
      <dialog id="new_hanger_form" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg text-center mt-2">
            Hanger Information
          </h3>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Type</span>
              </div>
              <input
                type="text"
                placeholder="Type"
                className="input input-bordered bg-white input-primary text-base-100"
                ref={typeRef}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Serial No.</span>
              </div>
              <input
                type="text"
                placeholder="Serial No."
                className="input input-bordered bg-white input-primary text-base-100"
                ref={serialRef}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Calibr. Load</span>
              </div>
              <input
                type="text"
                placeholder="Calibr. Load"
                className="input input-bordered bg-white input-primary text-base-100"
                ref={calibrRef}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Operat. Load</span>
              </div>
              <input
                type="text"
                placeholder="Operat. Load"
                className="input input-bordered bg-white input-primary text-base-100"
                ref={operatRef}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Travel</span>
              </div>
              <input
                type="text"
                placeholder="Travel"
                className="input input-bordered bg-white input-primary text-base-100"
                ref={travelRef}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Spring Rate</span>
              </div>
              <input
                type="text"
                placeholder="Spring Rate"
                className="input input-bordered bg-white input-primary text-base-100"
                ref={springRef}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Com.</span>
              </div>
              <input
                type="text"
                placeholder="Com."
                className="input input-bordered bg-white input-primary text-base-100"
                ref={comRef}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Inspector.</span>
              </div>
              <input
                type="text"
                placeholder="Inspector"
                className="input input-bordered bg-white input-primary text-base-100"
                ref={inspectorRef}
              />
            </label>
          </div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Ident. No.</span>
            </div>
            <input
              type="text"
              placeholder="Ident. No."
              className="input input-bordered bg-white input-primary text-base-100"
              ref={identRef}
            />
          </label>
          <div className="flex flex-col mt-8">
            <button className="btn btn-primary mb-2" onClick={handleSubmit}>
              Submit
            </button>
            <button className="btn btn-ghost" onClick={cancelSubmit}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NewHangerForm;
