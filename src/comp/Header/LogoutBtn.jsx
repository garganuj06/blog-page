import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../Appwrite/auth";
import { logout } from "../../redux/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authservice.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={logoutHandler}
    >
      LogOut
    </button>
  );
}

export default LogoutBtn;
