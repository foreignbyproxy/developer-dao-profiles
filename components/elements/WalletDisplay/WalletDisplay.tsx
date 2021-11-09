import React, { useMemo } from "react";
import makeBlockie from "ethereum-blockies-base64";
import { Flex, Box, Image, Text } from "@chakra-ui/react";

import ShortAddress from "../../elements/ShortAddress/ShortAddress";

interface Props {
	address: string;
	ensName?: string;
}

function UserMenu({ address, ensName }: Props) {
	if (!address) {
		return null;
	}

	const blockieImg = useMemo(() => makeBlockie(address), [address]);

	return (
		<Flex align="center" gridGap={3}>
			<Image
				w="50px"
				h="50px"
				borderRadius="full"
				border="solid"
				borderColor="white"
				src={blockieImg}
			/>
			<Box>
				{ensName && <Text>{ensName}</Text>}
				<ShortAddress address={address} />
			</Box>
		</Flex>
	);
}

export default UserMenu;
