import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { Appbar } from "./Components/Appbar";
import { userState } from "./store/atoms/user";
import axios from "axios";
import { BASE_URL } from "./.config.ts";
import { useEffect } from "react";
import { Signin } from "./Components/Signin.tsx";
import { Signup } from "./Components/Signup.tsx";
import { Courses } from "./Components/Courses.tsx";
import { PurchasedCourses } from "./Components/PurchasedCourses.tsx";
import { Landing } from "./Components/Landing.tsx";
function App() {
  axios.defaults.withCredentials  = true;
  return (
    <>
      <RecoilRoot>
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path={"/courses"} element={<Courses />} />
            <Route path={"/signin"} element={<Signin />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/purchasedCourses"} element={<PurchasedCourses />} />
            <Route path={"/"} element={<Landing />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  );
}

const InitUser = () => {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/me`, {
        withCredentials: true,
      });
      const data = response.data;
      if (data.username) {
        setUser({
          isLoading: false,
          userEmail: data.username,
        });
      }
    } catch (e) {
      console.log(e);
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <></>;
};

export default App;
