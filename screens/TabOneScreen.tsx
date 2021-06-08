import * as React from "react";
import { StyleSheet, Button, FlatList, ListRenderItem } from "react-native";

import { useForm } from "react-hook-form";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useWeb3 } from "../hooks/useWeb3";
import { ControlledTextInput } from "../components/ControlledTextInput";
import { useQuery } from "react-query";

type FormData = {
  address: string;
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

const test = async () => {
  await sleep(2000);
  return "test";
};

export default function TabOneScreen() {
  const { control, handleSubmit } = useForm<FormData>();
  const [balance, setBalance] = React.useState("Hola");
  const web3 = useWeb3();

  // Queries
  const { isLoading, data } = useQuery("todos", test);

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
      <Text>{`desde api: ${data}`}</Text>
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
