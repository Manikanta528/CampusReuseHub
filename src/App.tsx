import { Route, Routes } from "react-router-dom";
import LandingPage,{Login,SignUp,ProductDescriptionPage,ProductListingPage,UserChat} from "./pages";
import { CHAT, HOME, LOGIN, PDP, PLP, SIGNUP } from "./routes";

function App() {

  return (
    <Routes>
      <Route path={HOME} element={<LandingPage />} />
      <Route path={LOGIN} element={<Login />} />
      <Route path={SIGNUP} element={<SignUp />} />
      <Route path={PDP} element={<ProductDescriptionPage />} />
      <Route path={PLP} element={<ProductListingPage />} />
      <Route path={CHAT} element={<UserChat />} />
    </Routes>
  );
}

export default App
