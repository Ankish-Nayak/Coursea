import axios from "axios";
import { useEffect, useState } from "react";
import { courseParams } from "types";
import { BASE_URL } from "../.config";
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
type course = { id: number } & courseParams;
export const Courses = () => {
  const [courses, setCourses] = useState<course[]>();
  const [adminCourses, setAdminCourses] = useState<Map<number, number>>(
    new Map()
  );

  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/courses`);
      const data = response.data;
      if (data.courses) {
        setCourses(data.courses);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const init2 = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/courses/me`);
      const data = response.data;
      if (data.courses) {
        const map = new Map<number, number>();
        data.courses.map((course: course) => map.set(course.id, 1));
        setAdminCourses(map);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    init();
    init2();
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
            <Course
              key={course.id}
              course={course}
              show={adminCourses.get(course.id) ? true : false}
            />
          ))}
        {!courses && (
          <Typography variant="h5" textAlign={"center"}>
            No Courses
          </Typography>
        )}
      </div>
    </div>
  );
};

export const Course = ({ course, show }: { course: course; show: Boolean }) => {
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "5px",
      }}
    >
      <Typography variant="h6" textAlign={"center"}>
        {course.title}
      </Typography>
      <Typography variant="subtitle1" textAlign={"center"}>
        {course.description}
      </Typography>
      <img src={course.imageLink} style={{ width: 300 }} />
      {show && (
        <Button
          variant={"contained"}
          size={"large"}
          onClick={() => {
            navigate(`/courses/${course.id}`);
          }}
        >
          Edit
        </Button>
      )}
    </Card>
  );
};
