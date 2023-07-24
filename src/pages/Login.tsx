import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { HOME } from "../routes";

const Login = () => {
  const navigate = useNavigate();
  const [loginAuth, setLoginAuth] = useState({
    email: "",
    password: "",
  });

  function loginAuthHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(loginAuth);
    signInWithEmailAndPassword(auth, loginAuth.email, loginAuth.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate(HOME);
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginAuthHandler}>
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={loginAuth.email}
          onChange={(e) => {
            setLoginAuth({
              ...loginAuth,
              email: e.target.value,
            });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginAuth.password}
          autoComplete="new-password"
          onChange={(e) => {
            setLoginAuth({
              ...loginAuth,
              password: e.target.value,
            });
          }}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
