import RootLayout from "@/layout/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Toaster
       toastOptions={{
        className:'!bg-gray-800 bg-opacity-20 border !text-white'
       }}
      />
      <Component {...pageProps} />;
    </RootLayout>
  );
}
