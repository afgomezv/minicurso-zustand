import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseUrl = "https://zustand-minicurso-default-rtdb.firebaseio.com/";

const storageAPI: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
        res.json()
      );

      return JSON.stringify(data);
    } catch (error) {
      return null;
    }
  },

  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());
    //console.log(data);

    return;
  },

  removeItem: function (name: string): void | Promise<void> {
    console.log("removeItem", name);
  },
};

export const firebaseStorage = createJSONStorage(() => storageAPI);
