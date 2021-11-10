import React from "react";
import { Box, Heading, Text, Badge, HStack, Flex, LinkOverlay } from "@chakra-ui/react";

import TwitterHandle from "../TwitterHandle/TwitterHandle";
import DiscordName from "../DiscordName/DiscordName";
import UserENS from "../UserENS/UserENS";

import type { Profile } from "../../../types/common";

interface Props {
	profile: Profile;
}

function ProfileDetails({ profile }: Props) {
	return (
		<Box>
			<ProfileMainHeading profile={profile} />
			<ProfileSubHeading profile={profile} />

			<Box my={4}>
				{profile.name && <DiscordName handle={profile.discord} />}
				{(profile.name || profile.discord) && <TwitterHandle handle={profile.twitter} />}
				{profile.ens && <UserENS ens={profile.ens} />}
			</Box>

			{profile.discipline && (
				<Text my={4}>
					<strong>Discipline</strong>: {profile.discipline}
				</Text>
			)}

			{profile.bio && (
				<Box my={4} maxW="80ch">
					<Heading size="sm">Bio</Heading>
					{profile.bio}
				</Box>
			)}

			{profile.bestWayToContact && !!profile.bestWayToContact.length && (
				<Text my={4}>
					<strong>Best Way to Contact</strong>: {profile.bestWayToContact.join(", ")}
				</Text>
			)}

			{profile.interestedIn && !!profile.interestedIn.length && (
				<HStack my={4}>
					{profile.interestedIn.map((val) => {
						return (
							<Badge key={val} p={2} borderRadius="10px">
								{val}
							</Badge>
						);
					})}
				</HStack>
			)}
		</Box>
	);
}

function ProfileMainHeading({ profile }: Props) {
	if (profile.name) {
		return <Text m={0}>{profile.name}</Text>;
	} else if (profile.discord) {
		return <DiscordName handle={profile.discord} />;
	} else if (profile.twitter) {
		return <TwitterHandle handle={profile.twitter} />;
	} else {
		return null;
	}
}

function ProfileSubHeading({ profile }: Props) {
	return (
		<Flex gridGap={2}>
			{profile.country && <Text textStyle="subtitle">{profile.country}</Text>}
			{profile.discipline && (
				<Text
					textStyle="subtitle"
					sx={{
						"p + &::before": {
							content: '"•"',
							display: "inline-block",
							marginRight: "0.5rem",
						},
					}}
				>
					{profile.discipline}
				</Text>
			)}
		</Flex>
	);
}

export default ProfileDetails;
