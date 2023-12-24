import React from "react";
import SideBar from "../side-bar/SideBar";
import { Link } from "react-router-dom";
import { HomeAdmin } from "../../../router/path-route/PathRoute";
export default function Header() {
  return (
    <div className="mx-auto ">
      <div className="min-h-screen flex flex-col">
        <header className="bg-[#EEE8E3] text-[#30373E] p-3">
          <div className="flex justify-between items-center">
            <div className="p-1 mx-3 inline-flex">
              <Link to={HomeAdmin}>
                <img src="/Image/logo.png" className="w-24" />
              </Link>
              <i className="fas fa-bars  text-white" />
            </div>
            <div className=" flex flex-row">
              <div className="flex gap-4 mr-6 items-center">
                <a href="#" className=" no-underline hidden md:block lg:block">
                  Tina Tajik
                </a>
                <img
                  className="rounded-full"
                  width="44"
                  height="44"
                  src="https://img.icons8.com/external-victoruler-flat-victoruler/64/external-girl-people-victoruler-flat-victoruler-9.png"
                  alt="external-girl-people-victoruler-flat-victoruler-9"
                />
              </div>
              <div
                id="ProfileDropDown"
                className="rounded hidden shadow-md bg-white absolute pin-t mt-12 mr-1 pin-r"
              >
                <ul className="list-reset">
                  <li>
                    <a
                      href="#"
                      className="no-underline px-4 py-2 block text-black hover:bg-grey-light"
                    >
                      My account
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="no-underline px-4 py-2 block text-black hover:bg-grey-light"
                    >
                      Notifications
                    </a>
                  </li>
                  <li>
                    <hr className="border-t mx-2 border-grey-ligght" />
                  </li>
                  <li>
                    <a
                      href="#"
                      className="no-underline px-4 py-2 block text-black hover:bg-grey-light"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-1">
          <SideBar />
        </div>
      </div>
    </div>
  );
}
