import { useState } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

const Login = () => {
    const [loginAuth, setLoginAuth] = useState({
        email: "",
        password: ""
    })
    const [signUpAuth, setSignUpAuth] = useState({
        email: "",
        password: ""
    })

    function loginAuthHandler(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(loginAuth)
        signInWithEmailAndPassword(auth, loginAuth.email, loginAuth.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // ..
        });

    }
    function signUpAuthHandler(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(signUpAuth)
        createUserWithEmailAndPassword(auth, signUpAuth.email, signUpAuth.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
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
                onChange={(e) =>{
                    setLoginAuth({
                        ...loginAuth,
                        email: e.target.value
                        })
                    } 
                }
            /> 
            <input 
                type="password" 
                placeholder="Password" 
                value={loginAuth.password}
                autoComplete="new-password"
                onChange={(e) =>{
                    setLoginAuth({
                        ...loginAuth,
                        password: e.target.value
                        })
                    }
                }
            />
            <input type="submit" value="Login"/>
        </form>
        <h1>SignUp</h1>
        <form onSubmit={signUpAuthHandler}>
        <input type="email"
                placeholder="Email"
                value={signUpAuth.email} 
                autoComplete="email"
                onChange={(e) =>{
                    setSignUpAuth({
                        ...signUpAuth,
                        email: e.target.value
                        })
                    } 
                }
            /> 
            <input 
                type="password" 
                placeholder="Password" 
                value={signUpAuth.password}
                autoComplete="new-password"
                onChange={(e) =>{
                    setSignUpAuth({
                        ...signUpAuth,
                        password: e.target.value
                        })
                    }
                }
            />
            <input type="submit" value="sign Up"/>
        </form>
    </div>
  )
}

export default Login
