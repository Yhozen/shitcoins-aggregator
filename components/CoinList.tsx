import React from "react";
import { StyleSheet, FlatList, ListRenderItem, Image } from "react-native";

import { Text, View } from "../components/Themed";
import { useWeb3 } from "../hooks/useWeb3";
import { useQuery } from "react-query";
import { getERC20Logo, getERC20TXs } from "../services/bscscan";
import { uniqBy } from "ramda";
import pMap from "p-map";
import type Web3 from "web3";
import ERC20ABI from "../constants/ERC20.abi";

type DataType = {
  image: string;
  balance: number;
  decimals: number;
  address: string;
  symbol: string;
  name: string;
};

const getTokenInfo = async (
  address: string,
  contractAdress: string,
  web3: Web3
) => {
  const contract = new web3.eth.Contract(ERC20ABI as any, contractAdress);

  const [balance, decimals, name, symbol] = await Promise.all([
    contract.methods.balanceOf(address).call(),
    contract.methods.decimals().call(),
    contract.methods.name().call() as string,
    contract.methods.symbol().call() as string,
  ]);

  return {
    balance: Number(balance),
    decimals: Number(decimals),
    address: contractAdress,
    symbol,
    name,
  };
};

const test = async (web3: Web3, address: string) => {
  const txs = await getERC20TXs(address);
  const tokens: Record<string, string>[] = uniqBy(
    (val: Record<string, string>) => val.contractAddress,
    txs
  );

  const info = await pMap(tokens, async (token) => {
    const values = await getTokenInfo(address, token.contractAddress, web3);
    return { ...values, image: getERC20Logo(values.address) };
  });

  return info
    .filter(({ balance }) => balance !== 0)
    .sort(({ balance }) => balance);
};

type CoinListProps = {
  address: string;
};

export const CoinList: React.FC<CoinListProps> = ({ address }) => {
  const web3 = useWeb3();

  // Queries
  const { isLoading, data } = useQuery("todo", () => test(web3, address));

  const renderItem: ListRenderItem<DataType> = React.useCallback(({ item }) => {
    return (
      <View style={styles.coinsListContainer}>
        <Image source={{ uri: item.image }} style={{ height: 20, width: 20 }} />
        <Text>{item.name}</Text>
        <Text>{item.symbol}</Text>
        <Text>{item.balance / (10 ^ item.decimals)}</Text>
      </View>
    );
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList<DataType>
        renderItem={renderItem}
        keyExtractor={(item) => item.address}
        ItemSeparatorComponent={() => <View style={{ padding: 20 }} />}
        data={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  coinsListContainer: {
    display: "flex",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  input: {
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    height: 45,
    marginHorizontal: 25,
    marginTop: 15,
    paddingHorizontal: 15,
    width: "90%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
