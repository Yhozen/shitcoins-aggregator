import Web3 from "web3";
import create from "zustand";
import { persist, StateStorage } from "zustand/middleware";
import { get, set } from "idb-keyval";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { toChecksumAddress } = require("ethereum-checksum-address");

type Store = {
  web3: Web3;
  isDoneIntro: boolean;
  setIsDoneIntro: () => void;
  address?: string;
  setAddress: (address: string) => void;
  resetAddress: () => void;
};

const web3 = new Web3("https://bsc-dataseed1.binance.org:443");

// // Custom storage object
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, "has been retrieved");
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, "with value", value, "has been saved");
    set(name, value);
  },
};

// const cookieStorage: StateStorage = {
//   getItem: (name: string) => {
//     return Cookies.get(name) as string | null;
//   },
//   setItem: (name: string, value: string) => {
//     Cookies.set(name, value);
//   },
// };

export const isValidAddress = (address: string) => {
  try {
    toChecksumAddress(address);
    return true;
  } catch (error) {
    return false;
  }
};

export const useStore = create<Store>(
  persist(
    (set) => ({
      web3: web3,
      isDoneIntro: false,
      setIsDoneIntro: () => set({ isDoneIntro: true }),
      setAddress: (address: string) =>
        set({
          address: isValidAddress(address)
            ? toChecksumAddress(address)
            : undefined,
        }),
      resetAddress: () => set({ address: undefined }),
    }),
    {
      name: "app", // unique name
      getStorage: () => AsyncStorage, // (optional) by default the 'localStorage' is used
      blacklist: ["web3"],
    }
  )
);
