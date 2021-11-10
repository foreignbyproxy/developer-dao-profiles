import React, { useContext } from "react";
import { useRouter } from "next/router";

import { Box, Container } from "@chakra-ui/react";

import { OnboardContext } from "../../context/OnboardContext/OnboardContext";
import Navigation from "../../navigation/Navigation/Navigation";

import type { PageTypes } from "../../../types/common";

interface Props {
	children: React.ReactChild;
}

export default function Layout({
	children,
	containerWidth = "container.xl",
	containerHeight = "100vh",
	isPrivate = true,
}: Props & PageTypes) {
	const router = useRouter();
	const { wallet } = useContext(OnboardContext);

	if (isPrivate && !wallet) {
		router.push({
			pathname: "/",
		});
		return null;
	}

	return (
		<Box>
			<Navigation />
			<Container minH={containerHeight} maxW={containerWidth} my={4} py={4}>
				{children}
			</Container>
		</Box>
	);
}
