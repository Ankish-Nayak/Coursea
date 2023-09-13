import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "./store/atoms/user";
import axios from "axios";
import { BASE_URL } from "./.config.ts";
import { useEffect } from "react";
import { Appbar } from "./Components/Appbar.tsx";
import { Courses } from "./Components/Courses.tsx";
import { Signin } from "./Components/Signin.tsx";
import { Signup } from "./Components/Signup.tsx";
import { AddCourse } from "./Components/AddCourse.tsx";
function App() {
  axios.defaults.withCredentials = true;
  return (
    <Router>
      <Init />
      <Appbar />
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/courses"} element={<Courses />} />
        <Route path={"/signin"} element={<Signin />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/addCourse"} element={<AddCourse/>}/>
        <Route path={"/courses/:courseId"} element={<Course/>}/>
      </Routes>
    </Router>
  );
}

export default App;

export const Init = () => {
  const setUser = useSetRecoilState(userState);

  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`);
      const data = response.data;
      if (data.username) {
        setUser({
          isLoading: false,
          userEmail: data.username,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <></>;
};
