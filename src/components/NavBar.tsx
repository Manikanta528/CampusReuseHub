import { useNavigate } from "react-router-dom";
import { LOGIN, SIGNUP } from "../utilities/routes";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useState } from "react";

const NavBar = () => {
  const userState = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const handleClick = (link: string) => {
    navigate(link);
  };
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex justify-between items-center sticky top-0 backdrop-blur px-8 shadow">
      <img
        className="h-[60px]"
        src="../public/small-logo.svg"
        alt="CampusReuseHub"
      />
      {(userState.email.length > 0 && <div>{userState.email}</div>) || (
        <>
        <div className="hidden gap-4 sm:flex  ">
          <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => handleClick(SIGNUP)}> Sign up</button>
          <button className="" onClick={() => handleClick(LOGIN)}>Login {"->"}</button>
        </div>
        <button className="block gap-4 sm:hidden hover:bg-black/20 p-2 rounded" onClick={ () => setShowMenu((prev: boolean) => !prev)}>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        {
          showMenu && (
            <div className="absolute top-11 w-full left-0  md:block md:w-auto sm:hidden  " >
            <ul className="flex flex-col font-medium mt-8 mx-4 p-4 bg-white shadow-md rounded">
              <li className="hover:bg-indigo-600/70 hover:text-white rounded-md cursor-pointer">
               <a href="/signup" className="block py-2 pl-3 pr-4 sm:hidden">Sign up</a>
              </li>
              <li className="hover:bg-indigo-600/70 hover:text-white rounded-md cursor-pointer">
                <a href="/login" className="block py-2 pl-3 pr-4 sm:hidden">Log in</a>
              </li>
          </ul>
    </div>
          )
        }
        </>
      )}
    </div>
  );
};

export default NavBar;
