import axios from "axios";
import { useEffect, useState } from "react";
import { courseParams } from "types";
import { BASE_URL } from "../.config";
import { useSetRecoilState } from "recoil";
import { courseState } from "../store/atoms/course";
import {
  Button,
  Card,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

export const AddCourse = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [published, setPublished] = useState<boolean>(false);
  const [imageLink, setImageLink] = useState<string>("");

  const setCourse = useSetRecoilState(courseState);
  const handleOnClick = async () => {
    const userInputs: courseParams = {
      title,
      description,
      price,
      published,
      imageLink,
    };
    console.log(JSON.stringify(userInputs));
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/courses`,
        JSON.stringify(userInputs),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data.courseId) {
        setCourse({
          isLoading: false,
          course: {
            title,
            description,
            price,
            published,
            imageLink,
          },
        });
        alert("Course added successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid
      container
      style={{
        marginTop: "20vh",
      }}
    >
      <Grid
        item
        xl={6}
        display={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ margin: "auto" }}>
          <img src="/course.webp" />
        </div>
      </Grid>
      <Grid
        item
        xl={6}
        display={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
            // margin: "auto",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" textAlign={"center"}>
            Course Details
          </Typography>
          <TextField
            variant="outlined"
            label="title"
            fullWidth={true}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            label="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            label="price"
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
            }}
          />
          <TextField
            variant="outlined"
            label="imageLink"
            onChange={(e) => {
              setImageLink(e.target.value);
            }}
          />
          <RadioGroup
            style={{
              margin: "auto",
            }}
            // row
            aria-labelledby="course-publish"
            defaultValue="publish"
            name="radio-buttons-group"
            onChange={(e) => {
              // console.log(e.target.value);
              const newPublish = e.target.value === "y" ? true : false;
              setPublished(newPublish);
            }}
          >
            <FormLabel id="demo-row-radio-buttons-group-label">
              Course Publish
            </FormLabel>
            <FormControlLabel value="y" control={<Radio />} label="Publish" />
            <FormControlLabel
              value="n"
              control={<Radio />}
              label="Save but not publish"
            />
          </RadioGroup>
          <Button
            variant="contained"
            size="medium"
            style={{
              alignSelf: "center",
              marginTop: "2vh",
            }}
            onClick={handleOnClick}
          >
            Submit
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};
