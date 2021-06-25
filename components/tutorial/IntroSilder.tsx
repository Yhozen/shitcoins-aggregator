import React from "react";
import { StyleSheet, ListRenderItemInfo, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { View, Text } from "../Themed";

type Slide = {
  key: string;
  title: string;
  text: string;
  image: any;
  backgroundColor: string;
};
type IntroSliderProps = {
  isDone: boolean;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
};
const slides: Slide[] = [
  {
    key: "1",
    title: "Title 1",
    text: "Description.\nSay something cool",
    image: require("../../assets/images/1.png"),
    backgroundColor: "#59b2ab",
  },
  {
    key: "2",
    title: "Title 2",
    text: "Other cool stuff",
    image: require("../../assets/images/1.png"),
    backgroundColor: "#febe29",
  },
  {
    key: "3",
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require("../../assets/images/1.png"),
    backgroundColor: "#22bcb5",
  },
];
const Intro: React.FC<IntroSliderProps> = ({ isDone, setIsDone }) => {
  const renderItem = ({ item }: ListRenderItemInfo<Slide>) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image
          source={item.image}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  const onDoneIntro = () => {
    setIsDone(true);
  };
  const onSkipIntro = () => {
    setIsDone(true);
  };
  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDoneIntro}
      onSkip={onSkipIntro}
      showSkipButton
    />
  );
};
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 100,
  },
  title: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    paddingVertical: 30,
  },
});
export default Intro;
