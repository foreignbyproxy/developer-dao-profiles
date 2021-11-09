import React from "react";
import { Text, HStack, Icon } from "@chakra-ui/react";

interface Props {
	ens?: string;
}

function UserENS({ ens }: Props) {
	if (!ens) {
		return null;
	}

	return (
		<HStack>
			<Icon viewBox="0 0 320 512">
				<path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
			</Icon>
			<Text>{ens}</Text>
		</HStack>
	);
}

export default UserENS;
