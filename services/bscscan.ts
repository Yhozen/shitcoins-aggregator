import axios from "axios";

const baseURL = "https://api.bscscan.com/api";

const API_KEY = "3836FRU9MU9Y6A3RANDDRKGFM5K3T9TB53";
const axiosInstance = axios.create({
  baseURL,
});

export const getERC20TXs = async (address: string) => {
  const response = await axiosInstance.get("/", {
    params: {
      module: "account",
      action: "tokentx",
      apikey: API_KEY,
      address,
    },
  });
  if (response.status !== 200) {
    throw new Error("bad response");
  }
  return response.data?.result;
};

export const getERC20Balance = async (
  address: string,
  contractAddress: string
) => {
  const response = await axiosInstance.get("/", {
    params: {
      module: "account",
      action: "tokenbalance",
      tag: "latest",
      apikey: API_KEY,
      contractaddress: contractAddress,
      address,
    },
  });
  if (response.status !== 200) {
    throw new Error("bad response");
  }
  return response.data?.result;
};

export const getERC20Logo = async (contractAddress: string) => {
  return `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${contractAddress}/logo.png`;
};
