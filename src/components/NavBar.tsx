import { useNavigate } from "react-router-dom";
import { ADD_PRODUCT, HOME, LOGIN, PROFILE, SIGNUP } from "../utilities/routes";

import { useState, useEffect } from "react";
import { auth } from "../utilities/firebase";
import MinIdentityIcon from "../components/MinIdentityIcon";
import { getUserData } from "../pages/Profile";
import { signOut } from "firebase/auth";
import { HiLogout , HiUserCircle } from "react-icons/hi";
import smallLogo from "../assets/small-logo.svg";

const NavBar = (props: { isHomePage: boolean; }) => {
  const navigate = useNavigate();
  const handleClick = (link: string) => {
    navigate(link);
  };

  const [user, setUser] = useState("");
  useEffect(() => {
    if (auth) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          getUserData(user.uid).then((name: string) => {
            setUser(name);
          });
        } else {
          console.log("No user");
          if(props.isHomePage != true)
            navigate(HOME);
        }
      });
    }
  }, []);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  return (
    <div className="flex justify-between bg-white items-center h-16 sticky top-0 backdrop-blur px-6 sm:px-12  shadow">
      <img
        className="h-[40px]"
        src={smallLogo}
        alt="CampusReuseHub"
      />
      {(user.length > 0 && (
        <>
          <div className="h-8 w-8 p-1 rounded-full animate-border bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] cursor-pointer">
            <MinIdentityIcon
              username={user}
              className="rounded-full bg-white  "
              lightness="60"
              saturation="50"
              width="40"
              height="40"
              onClick={() => setShowProfileMenu((prev: boolean) => !prev)}
            />
          </div>
          {showProfileMenu && (
            <div className="absolute top-[70px] right-6 z-10 w-64 sm:right-8  border-[1px] border-gray-100 bg-white rounded-2xl">
              <ul className="flex flex-col gap-2 font-medium  bg-white shadow-md rounded-2xl p-4">
                <button
                  className="py-2 pl-3 pr-4 flex items-center justify-start gap-4  text-black border-[1px] border-gray-200 hover:text-black hover:border-indigo-200 hover:bg-indigo-200 rounded-lg cursor-pointer"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate(PROFILE);
                  }}
                >
                 <span className="relative flex h-fit w-fit">
                  <HiUserCircle />
                  </span>
                  <span>Profile</span>
                </button>
                <button
                  className="py-2 pl-3 pr-4 flex items-center justify-start gap-4 text-black hover:bg-green-200 border-[1px] border-gray-200 hover:border-green-200 hover:text-black rounded-lg cursor-pointer"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate(ADD_PRODUCT);
                  }}
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span> Sell Item</span>
                </button>
                <button
                  className="py-2 pl-3 pr-4 flex items-center justify-start gap-4  text-black border-[1px] border-gray-200 hover:text-black hover:border-red-200 hover:bg-red-200 rounded-lg cursor-pointer"
                  onClick={() => {
                    signOut(auth).then(() => {
                      // Sign-out successful.
                      setShowProfileMenu(false);
                      setShowMenu(false);
                      setUser("");
                      navigate(HOME);
                    });
                  }}
                >
                 <span className="relative flex h-fit w-fit">
                  <HiLogout />
                  </span>
                  <span> Log Out</span>
                </button>
              </ul>
            </div>
          )}
        </>
      )) || (
        (( props.isHomePage &&
        (<>
          <div className="hidden gap-4 sm:flex  ">
            <button
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => handleClick(SIGNUP)}
            >
              {" "}
              Sign up
            </button>
            <button className="" onClick={() => handleClick(LOGIN)}>
              Login {"->"}
            </button>
          </div>
          <button
            className="block gap-4 sm:hidden hover:bg-black/20 p-2 rounded"
            onClick={() => setShowMenu((prev: boolean) => !prev)}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {showMenu && (
            <div className="absolute top-11 w-full left-0  md:block md:w-auto sm:hidden  ">
              <ul className="flex flex-col font-medium mt-8 mx-4 p-4 bg-white shadow-md rounded sm:hidden">
                <li className="hover:bg-indigo-600/70 hover:text-white rounded-md cursor-pointer">
                  <a href="/signup" className="block py-2 pl-3 pr-4 sm:hidden">
                    Sign up
                  </a>
                </li>
                <li className="hover:bg-indigo-600/70 hover:text-white rounded-md cursor-pointer">
                  <a href="/login" className="block py-2 pl-3 pr-4 sm:hidden">
                    Log in
                  </a>
                </li>
              </ul>
            </div>
          )}
        </>)))
          )}
    </div>
  );
};

export default NavBar;
