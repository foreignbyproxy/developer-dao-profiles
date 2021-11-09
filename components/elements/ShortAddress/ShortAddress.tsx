import React, { useMemo } from "react";
import { Text } from "@chakra-ui/react";

import { formatShortAddress } from "../../../utils/web3";

interface Props {
	address: string;
}

function ShortAddress({ address }: Props) {
	const shortAddress = useMemo(() => formatShortAddress(address), [address]);
	return <Text color="white">{shortAddress}</Text>;
}

export default ShortAddress;
