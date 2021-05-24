import "./globals";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import IntroSlider from "./components/tutorial/IntroSilder";
import { useStore } from "./hooks/useStore";

export default function App() {
  const { isDoneIntro, setIsDoneIntro } = useStore();
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    if (isDoneIntro) {
      return (
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      );
    } else {
      return <IntroSlider isDone={isDoneIntro} setIsDone={setIsDoneIntro} />;
    }
  }
}
