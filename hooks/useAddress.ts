import { useStore } from "./useStore";

export const useAddress = () => useStore((state) => state.address);
