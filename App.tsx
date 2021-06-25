import "./globals";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import IntroSlider from "./components/tutorial/IntroSilder";

import { QueryClient, QueryClientProvider } from "react-query";
import { Platform } from "react-native";
import { LoadingView } from "./components/LoadingView";
import { useAppStore } from "./hooks/useAppStore";

const queryClient = new QueryClient();

const isBrowser = Platform.OS === "web";

export default function App() {
  const { isDoneIntro, setIsDoneIntro } = useAppStore();
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <LoadingView />;
  }

  if (isDoneIntro || isBrowser) {
    return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </QueryClientProvider>
    );
  }

  return <IntroSlider isDone={isDoneIntro} setIsDone={setIsDoneIntro} />;
}
