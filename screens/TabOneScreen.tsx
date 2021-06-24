import * as React from "react";
import { StyleSheet, Button } from "react-native";

import { useForm } from "react-hook-form";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useWeb3 } from "../hooks/useWeb3";
import { ControlledTextInput } from "../components/ControlledTextInput";
import { useAddress } from "../hooks/useAddress";
import { CoinList } from "../components/CoinList";
import { useStore } from "../hooks/useStore";
import { useEffect } from "react";

type FormData = {
  address: string;
  amount: number;
};

export default function TabOneScreen() {
  const { control, handleSubmit } = useForm<FormData>();
  const [balance, setBalance] = React.useState("Hola");
  const web3 = useWeb3();
  const address = useAddress();
  const setAddress = useStore((state) => state.setAddress);
  const resetAddress = useStore((state) => state.resetAddress);
  const onSubmit = handleSubmit(({ address }) => setAddress(address));

  useEffect(() => {
    if (address) {
      web3.eth
        .getBalance(address)
        .then((val) => setBalance(web3.utils.fromWei(val)));
    }
  }, [address]);

  return (
    <View style={styles.container}>
      {address ? (
        <>
          <Text style={styles.title}>{balance} BNB</Text>
          <CoinList address={address} />
        </>
      ) : (
        <>
          <Text style={styles.title}>Enter your BSC address</Text>
          <ControlledTextInput
            style={styles.input}
            name="address"
            control={control}
          />

          <Button title="Submit" onPress={onSubmit} />
        </>
      )}
      {address && <Button title="Remove address" onPress={resetAddress} />}
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
