import Web3 from "web3";
import create from "zustand";
import { persist } from "zustand/middleware";
import { get, set } from "idb-keyval"; // can use anything: IndexedDB, Ionic Storage, etc.

type Store = {
  web3: Web3;
  isDoneIntro: boolean;
  setIsDoneIntro: () => void;
};

const web3 = new Web3("https://bsc-dataseed1.binance.org:443");

// Custom storage object
const storage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, "has been retrieved");
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, "with value", value, "has been saved");
    set(name, value);
  },
};

export const useStore = create<Store>(
  persist(
    (set) => ({
      web3: web3,
      isDoneIntro: false,
      setIsDoneIntro: () => set((state) => ({ isDoneIntro: true })),
    }),
    {
      name: "app", // unique name
      getStorage: () => storage, // (optional) by default the 'localStorage' is used
    }
  )
);
