import CalibrateModal from "./CalibrateModal";
import { useNavigate } from "react-router-dom";
import * as ROSLIB from "roslib";
import { useEffect, useRef, useState } from "react";
const Navbar = ({ connected, setConnected, ros }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Open Shortcut</a>
              </li>
              <li>
                <a>t</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">A2TECH</a>
        </div>
        <div className="navbar-end">
          <CalibrateModal
            connected={connected}
            setConnected={setConnected}
            ros={ros}
          />
          <a
            className="btn btn-neutral me-2"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Open Shortcut
          </a>
          <a
            className="btn btn-neutral"
            onClick={() => {
              navigate("/hangerdb");
            }}
          >
            Hanger Cert Database
          </a>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Shortcut Key</h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-center">Key</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <div className="flex justify-center">
                    <kbd className="kbd">Space</kbd>
                  </div>
                  <td className="text-center">Lock Hanger ID</td>
                </tr>
                <tr>
                  <div className="flex justify-center">
                    <kbd className="kbd">Q</kbd>
                  </div>
                  <td className="text-center">Snapshot</td>
                </tr>
                <tr>
                  <div className="flex justify-center">
                    <kbd className="kbd">E</kbd>
                  </div>
                  <td className="text-center">Record</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Navbar;
