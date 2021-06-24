import * as React from "react";
import { StyleSheet, Button, FlatList, ListRenderItem } from "react-native";

import { useForm } from "react-hook-form";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useWeb3 } from "../hooks/useWeb3";
import { ControlledTextInput } from "../components/ControlledTextInput";
import { useQuery } from "react-query";
import { getERC20TXs } from "../services/bscscan";
import { uniqBy } from "ramda";
import pMap from "p-map";
import type Web3 from "web3";
import ERC20ABI from "../constants/ERC20.abi";

type FormData = {
  address: string;
  amount: number;
};

const DATA = [
  {
    image: "https://bscscan.com//token/images/safemarscrypto_32.png",
    name: "Bitcoin",
    symbol: "BTC",
    address: "1",
  },
  {
    image: "https://bscscan.com//token/images/safemarscrypto_32.png",
    name: "Binance coin",
    symbol: "BNB",
    address: "2",
  },
  {
    image: "https://bscscan.com//token/images/safemarscrypto_32.png",
    name: "Ethereum",
    symbol: "ETH",
    address: "3",
  },
];

type DataType = typeof DATA[number];

const sleep = (ms: number) => new Promise((res, rej) => setTimeout(res, ms));

const getBalances = async (
  address: string,
  contractAdress: string,
  web3: Web3
) => {
  const contract = new web3.eth.Contract(ERC20ABI as any, contractAdress);

  const [balance, decimals] = await Promise.all([
    contract.methods.balanceOf(address).call(),
    contract.methods.decimals().call(),
  ]);

  console.log(balance);
  return { balance: Number(balance), decimals: Number(decimals) };
};

const test = async (web3: Web3) => {
  const txs = await getERC20TXs("0x658544eD85344c3F2cb911398939a8C8F00249c6");
  const tokens: Record<string, string>[] = uniqBy(
    (val: Record<string, string>) => val.contractAddress,
    txs
  );
  const balances = await pMap(tokens, (token) =>
    getBalances(
      "0x658544eD85344c3F2cb911398939a8C8F00249c6",
      token.contractAddress,
      web3
    )
  );
  return balances.filter(({ balance }) => balance !== 0);
};

export default function TabOneScreen() {
  const { control, handleSubmit } = useForm<FormData>();
  const [balance, setBalance] = React.useState("Hola");
  const web3 = useWeb3();

  // Queries
  const { isLoading, data } = useQuery("todo", () => test(web3));

  const renderItem: ListRenderItem<DataType> = React.useCallback(({ item }) => {
    return (
      <View style={styles.coinsListContainer}>
        <Text>{item.image}</Text>
        <Text>{item.name}</Text>
        <Text>{item.symbol}</Text>
      </View>
    );
  }, []);

  const onSubmit = handleSubmit(({ address }) =>
    web3.eth
      .getBalance(address)
      .then((val) => setBalance(web3.utils.fromWei(val)))
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text style={styles.title}>{balance} balances</Text>
      <Text>{`desde api: ${JSON.stringify(data)}`}</Text>
      <ControlledTextInput
        style={styles.input}
        name="address"
        control={control}
      />

      <Button title="Submit" onPress={onSubmit} />
      <FlatList<DataType>
        renderItem={renderItem}
        keyExtractor={(item) => item.address}
        data={DATA}
      />

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  coinsListContainer: {
    display: "flex",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
