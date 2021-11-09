import React, { useContext } from "react";
import { Box, Flex, Image, HStack, Button } from "@chakra-ui/react";
import NextLink from "next/link";

import { OnboardContext } from "../../context/OnboardContext/OnboardContext";
import UserOnboarding from "../../elements/UserMenu/UserMenu";

function Navigation() {
	const { wallet } = useContext(OnboardContext);

	return (
		<Flex justify="space-between" align="center" bg="black" px={2} py={2}>
			<Box>
				<Image src="/developer-dao-logo.jpg" w="50" h="50" />
			</Box>

			{wallet ? (
				<HStack>
					<NextLink href={"/profiles"} passHref>
						<Button as="a">Profiles</Button>
					</NextLink>
				</HStack>
			) : null}

			<Box>
				<UserOnboarding />
			</Box>
		</Flex>
	);
}

export default Navigation;
