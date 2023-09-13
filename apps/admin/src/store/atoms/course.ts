import { atom } from "recoil";
type course = {
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: Boolean;
};
export const courseState = atom<{ isLoading: Boolean; course: course | null }>({
  key: "courseState",
  default: {
    isLoading: true,
    course: null,
  },
});
