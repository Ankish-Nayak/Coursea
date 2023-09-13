import { atom } from "recoil";

export const userState = atom<{ isLoading: Boolean; userEmail: string | null }>(
  {
    key: "userState",
    default: {
      isLoading: true,
      userEmail: null,
    },
  }
);
