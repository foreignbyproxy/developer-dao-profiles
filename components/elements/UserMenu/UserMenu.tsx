import React, { useContext } from "react";
import { Box, Button } from "@chakra-ui/react";

import { OnboardContext } from "../../context/OnboardContext/OnboardContext";

import UserDropdown from "../UserDropdown/UserDropdown";

function UserMenu() {
	const { onboard, wallet } = useContext(OnboardContext);

	if (!onboard) {
		return null;
	}

	return (
		<Box>{wallet ? <UserDropdown /> : <Button onClick={onboard.walletSelect}>Connect</Button>}</Box>
	);
}

export default UserMenu;
