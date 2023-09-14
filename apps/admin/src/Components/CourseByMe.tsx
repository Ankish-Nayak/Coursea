import axios from "axios";
import { useEffect, useState } from "react";
import { courseParams } from "types";
import { BASE_URL } from "../.config";
import { Typography } from "@mui/material";
import { Course } from "./Courses";
type course = courseParams & { id: number };
export const CourseByMe = () => {
  const [courses, setCourses] = useState<course[]>();
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/courses/me`);
      const data = response.data;
      if (data.courses) {
        setCourses(data.courses);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <Typography variant="h5" textAlign={"center"}>
        Courses
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          paddingTop: "2vw",
        }}
      >
        {courses &&
          courses.map((course) => (
            <Course key={course.id} course={course} show={true} />
          ))}
        {(!courses || courses.length === 0) && (
          <Typography variant="h5" textAlign={"center"}>
            No Courses
          </Typography>
        )}
      </div>
    </div>
  );
};
