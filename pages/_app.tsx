import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import { createEmotionCache } from "../src/utils/createEmotionCache";
import { lightThemeOptions } from "../src/theme";

import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../styles/globals.css";

interface MyAppProps
  extends AppProps<{
    session?: Session | null;
  }> {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <SessionProvider session={session}>
          <CssBaseline />
          <Component {...pageProps} />
          <ToastContainer position="top-center" pauseOnHover={false} pauseOnFocusLoss={false} />
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
