import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Register from "./components/register";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.apply();
function App() {
  const [isAuth, setAuth] = useState(false);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/is-verify", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setAuth(true) : setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const Auth = (bool) => {
    setAuth(bool);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/dashboard"
            element={
              isAuth ? (
                <Dashboard authStatus={Auth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuth ? (
                <Register authStatus={Auth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            exact
            path="/login"
            element={
              !isAuth ? (
                <Login authStatus={Auth} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
