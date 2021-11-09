import { extendTheme, ThemeConfig } from "@chakra-ui/react";

import { textStyles } from "./theme/textStyles";
import { Button } from "./theme/button";

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: true,
};


const theme = extendTheme({
	config,
	textStyles,
	components: {
		Button
	}
});

export default theme;
