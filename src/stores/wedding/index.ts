import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { PersonSlice, createPersonSlice } from "./person.slice";
import { GuestSlice, createGuestSlice } from "./guest.slice";
import { DateSlice, createDateSlice } from "./date.slice";
import {
  ConfirmationSlice,
  createComfirmationSlice,
} from "./confirmation.slice";

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<ShareState>()(
  //persist(
  devtools(
    (...a) => ({
      ...createPersonSlice(...a),
      ...createGuestSlice(...a),
      ...createDateSlice(...a),
      ...createComfirmationSlice(...a),
    })
    //),{ name: "wedding-store" }
  )
);
