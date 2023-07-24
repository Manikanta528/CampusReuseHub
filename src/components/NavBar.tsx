import { useNavigate } from "react-router-dom";
import { LOGIN, SIGNUP } from "../routes";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const NavBar = () => {
  const userState = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const handleClick = (link: string) => {
    navigate(link);
  };

  return (
    <>
      {(userState.email.length > 0 && <div>{userState.email}</div>) || (
        <div>
          <button onClick={() => handleClick(SIGNUP)}>SignUp</button>
          <button onClick={() => handleClick(LOGIN)}>Login</button>
        </div>
      )}
    </>
  );
};

export default NavBar;
