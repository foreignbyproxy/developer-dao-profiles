import React, { FunctionComponent } from "react";
import NextLink from "next/link";
import { Box, LinkBox, Text, Badge, HStack, Flex, LinkOverlay } from "@chakra-ui/react";

import ProfileMainHeading from "../ProfileMainHeading/ProfileMainHeading";
import ProfileSubHeading from "../ProfileSubHeading/ProfileSubHeading";
import TwitterHandle from "../TwitterHandle/TwitterHandle";
import DiscordName from "../DiscordName/DiscordName";
import UserENS from "../UserENS/UserENS";

import type { Profile } from "../../../types/common";

interface Props {
	profile: Profile;
}

function ProfilePreview({ profile }: Props) {
	return (
		<LinkBox
			display="flex"
			flexDirection="column"
			px={3}
			py={2}
			border="solid"
			borderWidth="1px"
			borderColor="gray.100"
			borderRadius="4px"
			boxShadow="md"
		>
			<NextLink href={`/profiles/${profile.id}`} passHref>
				<LinkOverlay>
					<PreviewMainHeading profile={profile} />
					<PreviewSubHeading profile={profile} />

					<Box my={2}>
						{profile.name && <DiscordName handle={profile.discord} />}
						{(profile.name || profile.discord) && (
							<TwitterHandle handle={profile.twitter} />
						)}
						{profile.ens && <UserENS ens={profile.ens} />}
					</Box>

					{!!profile?.interestedIn?.length && (
						<HStack mt="auto">
							{profile.interestedIn.map((val) => {
								return (
									<Badge key={val} p={2} borderRadius="10px">
										{val}
									</Badge>
								);
							})}
						</HStack>
					)}
				</LinkOverlay>
			</NextLink>
		</LinkBox>
	);
}

function PreviewMainHeading({ profile }: Props) {
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

function PreviewSubHeading({ profile }: Props) {
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

export default ProfilePreview;
