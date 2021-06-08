import * as React from "react";
import { StyleSheet, Button } from "react-native";
import { useForm } from "react-hook-form";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useWeb3 } from "../hooks/useWeb3";
import { ControlledTextInput } from "../components/ControlledTextInput";

type FormData = {
  address: string;
  amount: number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "red",
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

export default function TabOneScreen() {
  const { control, handleSubmit } = useForm<FormData>();
  const [balance, setBalance] = React.useState("Hola");
  const web3 = useWeb3();

  const onSubmit = handleSubmit(({ address, amount }) =>
    web3.eth
      .getBalance(address)
      .then((val) => setBalance(web3.utils.fromWei(val)))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text style={styles.title}>{balance} balances</Text>

      <ControlledTextInput
        style={styles.input}
        name="address"
        control={control}
      />

      <Button title="Submit" onPress={onSubmit} />

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}
