import React, { useContext } from "react";
import { Heading, Text, Flex, Button, Image } from "@chakra-ui/react";
import { OnboardContext } from "../../context/OnboardContext/OnboardContext";

function UserOnboarding() {
	const { onboard } = useContext(OnboardContext);

	return (
		<Flex flexDirection="column" justify="center" align="center" gridGap={2}>
			<Image src="/developer-dao-logo.jpg" borderRadius="50%" />
			<Heading>Developer DAO</Heading>
			<Text>Welcome to the Developer DAO user directory</Text>
			{onboard && <Button onClick={onboard.walletSelect}>Connect Wallet</Button>}
		</Flex>
	);
}

export default UserOnboarding;
