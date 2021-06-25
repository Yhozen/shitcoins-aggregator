import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Store = {
  isDoneIntro: boolean;
  setIsDoneIntro: () => void;
};

export const useAppStore = create<Store>(
  persist(
    (set) => ({
      isDoneIntro: false,
      setIsDoneIntro: () => set({ isDoneIntro: true }),
    }),
    {
      name: "main", // unique name
      getStorage: () => AsyncStorage, // (optional) by default the 'localStorage' is used
    }
  )
);
