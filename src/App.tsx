import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import LandingPage, {
  Login,
  SignUp,
  ProductDescriptionPage,
  ProductListingPage,
  UserChat,
  Profile,
  AddProductPage,
} from "./pages";
import {
  CHAT,
  HOME,
  LOGIN,
  PDP,
  PLP,
  SIGNUP,
  PROFILE,
  ADD_PRODUCT,
} from "./utilities/routes";
import { Bugfender } from "@bugfender/sdk";

function App() {
  useEffect(() => {
    Bugfender.log("App Created");
  }, []);

  return (
    <Routes>
      <Route path={HOME} element={<LandingPage />} />
      <Route path={LOGIN} element={<Login />} />
      <Route path={SIGNUP} element={<SignUp />} />
      <Route path={PROFILE} element={<Profile />} />
      <Route path={PDP} element={<ProductDescriptionPage />} />
      <Route path={PLP} element={<ProductListingPage />} />
      <Route path={ADD_PRODUCT} element={<AddProductPage />} />
      <Route path={CHAT} element={<UserChat />} />
    </Routes>
  );
}

export default App;
