import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import {
	Heading,
	Text,
} from "@chakra-ui/react";

import { OnboardContext } from "../components/context/OnboardContext/OnboardContext";
import ProfileForm from "../components/forms/ProfileForm/ProfileForms";

import { getUserProfile } from "../utils/supabase";

import type { NextPage } from "next";
import type { Profile } from "../types/common";

interface ProfileType {
	user: Profile | null;
	hasFetched: boolean;
}

const ProfilePage: NextPage = () => {
	const { address } = useContext(OnboardContext);
	const [profileData, setProfileData] = useState<ProfileType>({
		user: null,
		hasFetched: false,
	});

	useEffect(() => {
		if (address) {
			getUserProfile(address).then(({ data, error }) => {
				if(!error) {
					setProfileData({
						user: data,
						hasFetched: true,
					});
				}
			});
		}
	}, [address]);

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

			{profileData.hasFetched && !!address && (
				<>
					<Text mb={4}>Complete the following form to help people find you.</Text>
					<ProfileForm address={address} userProfile={profileData.user} />
				</>
			)}
		</>
	);
};

export default ProfilePage;
