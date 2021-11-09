import React, { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Heading, Text, Flex, Button, Image } from "@chakra-ui/react";
import { OnboardContext } from "../components/context/OnboardContext/OnboardContext";
import UserOnboarding from "../components/elements/UserOnboarding/UserOnboarding";

import type { NextPage } from "next";

const Home: NextPage = () => {
	const router = useRouter();

	const { onboard, wallet } = useContext(OnboardContext);

	if (wallet) {
		let destination = "/profiles";
		if (typeof router.query.redirect_to === "string") {
			destination = router.query.redirect_to;
		}

		router.push(destination);
	}

	return (
		<>
			<Head>
				<title>Developer DAO</title>
				<meta name="description" content="Developer DAO" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<UserOnboarding />
		</>
	);
};

export async function getStaticProps() {
	return {
		props: {
			containerWidth: "480px",
			containerHeight: "initial",
			isPrivate: false,
		},
	};
}

export default Home;
