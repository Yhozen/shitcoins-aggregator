import create from "zustand";
import Web3 from "web3";

type Store = {
  web3: Web3;
  isDoneIntro: boolean;
  setIsDoneIntro: () => void;
};

const web3 = new Web3("https://bsc-dataseed1.binance.org:443");

export const useStore = create<Store>((set) => ({
  web3: web3,
  isDoneIntro: false,
  setIsDoneIntro: () => set((state) => ({ isDoneIntro: true })),
}));
