import { useEffect, useState } from "react";
import { courseParams } from "types";
import { BASE_URL } from "../.config";
import axios from "axios";
import { Card, Typography } from "@mui/material";

type course = { id: number } & courseParams;

export const PurchasedCourses = () => {
  const [courses, setCourses] = useState<course[]>();

  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/purchasedCourses`, {
        withCredentials: true,
      });
      const data = response.data;
      if (data.purchasedCourses) {
        setCourses(data.purchasedCourses);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    init();
  }, []);
  if (!courses || courses.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" textAlign={"center"}>
          No Courses purchased yet.
        </Typography>
      </div>
    );
  }
  return (
    <div>
      <Typography variant="h5" textAlign={"center"}>Purchased Courses</Typography>
      <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", padding: "2vw"}}>
        {courses &&
          courses.map((course) => <Course course={course} key={course.id} />)}
      </div>
    </div>
  );
};

export const Course = ({ course }: { course: course }) => {
  return (
    <Card  variant={"outlined"} style={{display: 'flex', flexDirection: 'column',justifyContent: "center", padding: '5px'}}>
      <Typography variant="h6">{course.title}</Typography>
      <Typography variant="subtitle1">{course.description}</Typography>
      <img src={course.imageLink} style={{ width: 300 }} />
    </Card>
  );
};
