import { create } from "zustand";

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandabears: number;

  bears: Bear[];

  computed: {
    totalBears: number;
  };

  increaseBlackBears: (by: number) => void;
  increasePolarkBears: (by: number) => void;
  increasePandaBears: (by: number) => void;

  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
}

export const useBearStore = create<BearState>()((set, get) => ({
  blackBears: 10,
  polarBears: 5,
  pandabears: 1,

  bears: [{ id: 1, name: "Oso #1" }],

  computed: {
    get totalBears() {
      return (
        get().blackBears +
        get().polarBears +
        get().pandabears +
        get().bears.length
      );
    },
  },

  increaseBlackBears: (by: number) =>
    set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarkBears: (by: number) =>
    set((state) => ({ polarBears: state.polarBears + by })),
  increasePandaBears: (by: number) =>
    set((state) => ({ pandabears: state.pandabears + by })),

  doNothing: () => set((state) => ({ bears: [...state.bears] })),
  addBear: () =>
    set((state) => ({
      bears: [
        ...state.bears,
        { id: state.bears.length + 1, name: `Oso # ${state.bears.length + 1}` },
      ],
    })),
  clearBears: () => set({ bears: [] }),
}));
