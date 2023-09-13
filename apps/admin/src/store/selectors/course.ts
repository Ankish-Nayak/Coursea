import { selector } from "recoil";
import { courseState } from "../atoms/course";

export const courseTitle = selector({
  key: "courseTitle",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.title;
    }
    return "";
  },
});

export const courseDescription = selector({
  key: "courseDescription",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.description;
    }
    return "";
  },
});

export const coursePrice = selector({
  key: "coursePrice",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.price;
    }
    return "";
  },
});
