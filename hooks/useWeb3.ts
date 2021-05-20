import { useStore } from "./useStore";

export const useWeb3 = () => useStore(state => state.web3)