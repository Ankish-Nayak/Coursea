import { atom } from "recoil";
type course = {
  id: number,
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
};
export const courseState = atom<{ isLoading: Boolean; course: course  }>({
  key: "courseState",
  default: {
    isLoading: true,
    course: {
      id: 0,
      title: "",
      description: "",
      price: 0,
      imageLink: "",
      published: false,
    },
  },
});
