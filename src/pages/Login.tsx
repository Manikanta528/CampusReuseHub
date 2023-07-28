import { useState } from "react";
import { auth } from "../utilities/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { PLP } from "../utilities/routes";
import toast,{ Toaster } from 'react-hot-toast';
import { firebaseErrors } from "../utilities/firebaseErrors";
import Logo from "../assets/Logo.svg";


const Login = () => {
  const navigate = useNavigate();
  const [loginAuth, setLoginAuth] = useState({
    email: "",
    password: "",
  });

  function loginAuthHandler(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if(loginAuth.email.length < 1){
      toast.error("Email cannot be empty");
      return;
    }
    if(loginAuth.password.length < 6){
      toast.error("Password should be at least 6 characters long");
      return;
    }
    signInWithEmailAndPassword(auth, loginAuth.email, loginAuth.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        return navigate(PLP);
        // ...
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message.split(":")[1].trim().split(" ")[1];
        const index : (
        '(auth/user-not-found)' |
        '(auth/email-already-in-use)'|
        '(auth/wrong-password)'|
        '(auth/weak-password)'|
        '(auth/too-many-requests)'|
        '(auth/invalid-email)'
        ) = errorMessage.substring(0, errorMessage.length - 1)
        toast.error(firebaseErrors[index]);

        // ..
      });
  }

  return (
    <div className="h-screen bg-white opacity-80 bg-background-pattern bg-26 ">
    <Toaster
      position="top-center"
    />
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
    <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 sm:h-20 w-auto"
          src={Logo}
          alt="CampusReuseHub"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => {
                  setLoginAuth({
                    ...loginAuth,
                    email: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => {
                  setLoginAuth({
                    ...loginAuth,
                    password: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={loginAuthHandler}
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don’t have an account yet?{' '}
          <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign Up
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
