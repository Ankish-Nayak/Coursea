import axios from "axios";
import { useEffect, useState } from "react";
import { courseParams } from "types";
import { BASE_URL } from "../.config";
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type course = {
  id: number;
} & courseParams;
export const Courses = () => {
  const [courses, setCourses] = useState<course[]>();

  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/courses`, {
        withCredentials: true,
      });
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
          paddingTop: "2vw"
        }}
      >
        {courses &&
          courses.map((course) => <Course key={course.id} course={course} />)}
        {!courses && (
          <Typography variant="h5" textAlign={"center"}>
            No Courses
          </Typography>
        )}
      </div>
    </div>
  );
};

export const Course = ({ course }: { course: course }) => {
  const navigate = useNavigate();
  const handleOnClick = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/courses/${course.id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message === "Course purchased successfully") {
        alert("course purchased");
        navigate("/purchasedCourses");
      }
    } catch (e) {
      console.log(e);
    }
  };
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
      <Button
        variant="contained"
        size="large"
        onClick={handleOnClick}
        style={{ alignSelf: "center", marginTop: "5px" }}
      >
        Purchase
      </Button>
    </Card>
  );
};
