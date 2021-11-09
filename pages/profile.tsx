import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { Heading, Text, useToast } from "@chakra-ui/react";

import { OnboardContext } from "../components/context/OnboardContext/OnboardContext";
import ProfileForm from "../components/forms/ProfileForm/ProfileForms";
import useSignMessageModal from "../utils/useSignMessageModal";

import { getUserProfileBykey } from "../utils/supabase";

import type { NextPage } from "next";
import type { Profile } from "../types/common";

interface ProfileType {
	user: Profile | null;
	hasFetched: boolean;
}

const UserProfile: NextPage = () => {
	const { askForSignature, SigningModal } = useSignMessageModal();
	const toast = useToast();

	const { wallet, address } = useContext(OnboardContext);
	const [profileData, setProfileData] = useState<ProfileType>({
		user: null,
		hasFetched: false,
	});

	useEffect(() => {
		if (wallet && address) {
			//Get user signature to prove they are who they say they are
			askForSignature(wallet, address)
				.then((signature: string) => {
					debugger;
					if (signature) {
						getUserProfileBykey("signature", signature).then(({ data, error }) => {
							setProfileData({
								user: !error ? data : null,
								hasFetched: true,
							});
						});
					} else {
						throw new Error("Failed to get user signature");
					}
				})
				.catch((error) => {
					debugger;
					toast({
						title: "Nope",
						description: "We need your to signature to fetch your user profile.",
						status: "error",
						duration: 5000,
						isClosable: true,
					});
				});
		}
	}, [wallet, address]);

	return (
		<>
			<Head>
				<title>Profile - Developer DAO</title>
				<meta name="description" content="Developer DAO" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Heading as="h1" mb={4}>
				Profiles
			</Heading>

			{profileData.hasFetched && address && (
				<>
					<Text mb={4}>Complete the following form to help people find you.</Text>
					<ProfileForm address={address} userProfile={profileData.user} />
				</>
			)}

			<SigningModal />
		</>
	);
};

export default UserProfile;
