import axios from "axios";
import { useEffect, useState } from "react";
import { courseParams } from "types";
import { BASE_URL } from "../.config";
import { useSetRecoilState } from "recoil";
import { courseState } from "../store/atoms/course";

export const AddCourse = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [published, setPublished] = useState<boolean>(false);
  const [imageLink, setImageLink] = useState<string>("");

  const setCourse = useSetRecoilState(courseState);
  const init = async () => {
    const userInputs: courseParams = {
      title,
      description,
      price,
      published,
      imageLink,
    };
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
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    init();
  },[]);
  return <></>
};
