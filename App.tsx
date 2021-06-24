import "./globals";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import IntroSlider from "./components/tutorial/IntroSilder";
import { useStore } from "./hooks/useStore";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  const { isDoneIntro, setIsDoneIntro } = useStore();
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    if (isDoneIntro) {
      return (
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </QueryClientProvider>
      );
    } else {
      return <IntroSlider isDone={isDoneIntro} setIsDone={setIsDoneIntro} />;
    }
  }
}
