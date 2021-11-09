import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Heading } from "@chakra-ui/react";

import ProfileDetails from "../../components/elements/ProfileDetails/ProfileDetails";

import { getUserProfileBykey } from "../../utils/supabase";

import type { NextPage } from "next";
import type { Profile } from "../../types/common";

interface Props {
	profile: Profile;
}

const ProfilePage: NextPage<Props> = ({ profile }) => {
	return (
		<>
			<Head>
				<title>Profile - Developer DAO</title>
				<meta name="description" content="Developer DAO" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Heading as="h1" mb={4}>
				Profile
			</Heading>

			<ProfileDetails profile={profile}/>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	if (typeof context?.params?.id === "string") {
		const results = await getUserProfileBykey("id", context?.params?.id);

		if (results.data) {
			return {
				props: {
					profile: results.data,
				},
			};
		} else {
			return {
				notFound: true,
			};
		}
	} else {
		return {
			notFound: true,
		};
	}
};

export default ProfilePage;
