import React, { useContext } from "react";
import NextLink from "next/link";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { OnboardContext } from "../../context/OnboardContext/OnboardContext";
import WalletDisplay from "../WalletDisplay/WalletDisplay";

function UserDropdown() {
	const { onboard, address, ens } = useContext(OnboardContext);

	if (!address) {
		return null;
	}

	return (
		<Menu gutter={8}>
			<MenuButton
				as={Button}
				rightIcon={<ChevronDownIcon color="white" />}
				title={address}
				bg="transparent"
				_hover={{ bg: "transparent" }}
				_focus={{ bg: "transparent" }}
				_active={{ bg: "transparent" }}
			>
				<WalletDisplay address={address} ensName={ens?.name} />
			</MenuButton>
			<MenuList py={0} mt={2} borderRadius={0}>
				<NextLink href={"/profile"} passHref>
					<MenuItem as="a">Profile</MenuItem>
				</NextLink>
				<MenuItem onClick={onboard.walletReset}>Disconnect</MenuItem>
			</MenuList>
		</Menu>
	);
}

export default UserDropdown;
