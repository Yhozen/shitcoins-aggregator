import Web3 from "web3";
import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { toChecksumAddress } = require("ethereum-checksum-address");

type Store = {
  web3: Web3;
  address?: string;
  setAddress: (address: string) => void;
  resetAddress: () => void;
};

const web3 = new Web3("https://bsc-dataseed1.binance.org:443");

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
      web3,
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
