import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/wrappers/Layout/Layout";
import { OnboardProvider } from "../components/context/OnboardContext/OnboardContext";

import "../styles/globals.css";

import type { AppProps } from "next/app";

import theme from "../utils/theme";

function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme} resetCSS>
			<OnboardProvider>
				<Layout {...pageProps}>
					<Component {...pageProps} />
				</Layout>
			</OnboardProvider>
		</ChakraProvider>
	);
}

export default App;
