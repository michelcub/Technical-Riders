import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { LoginProvider } from "./context/LoginContext";
import { AppProvider } from "./context/AppContext";
import NavBar from "./components/NavBar";
import MainToaster from "./components/MainToaster";
import Home from "./views/Home";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import ResetPassword from "./views/ResetPassword";
import NewPassword from "./views/NewPassword";
import { NotFound } from "./views/NotFound";
import { PageActivation } from "./views/PageActivation";
import RiderCreation from "./views/RiderCreation";
import PrivateRoutes from "./components/PrivateRoutes";
import { CreateBand } from "./views/CreateBand";
import CreateVenue from "./views/CreateVenue";
import { ChatView } from "./views/ChatView";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore'



function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyAk9LQn7XfopymectYp-WVw-Uknb2WDL_o",
    authDomain: "rider-f6f91.firebaseapp.com",
    projectId: "rider-f6f91",
    storageBucket: "rider-f6f91.appspot.com",
    messagingSenderId: "51699454372",
    appId: "1:51699454372:web:0d9e51c01d21044cd43131",
    measurementId: "G-MEWYJSSFTP"
  };
  
  // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

  return (
    <BrowserRouter basename="/">
      <MainToaster />
      <LoginProvider>
        <AppProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/recover-password/:token" element={<NewPassword />} />
            <Route
              path="/activation/:token"
              element={<PageActivation />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ridercreation" element={<RiderCreation />} />
              <Route path="/createband" element={<CreateBand />} />
              <Route path="/create-venue" element={<CreateVenue />} />
              <Route path="/chat" element={<ChatView/>}></Route>
            </Route>
          </Routes>
        </AppProvider>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
