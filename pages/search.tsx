import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { Heading, Grid } from "@chakra-ui/react";

import { OnboardContext } from "../components/context/OnboardContext/OnboardContext";
import ProfilePreview from "../components/elements/ProfilePreview/ProfilePreview";
import Pagination from "../components/elements/Pagination/Pagination";
import SearchForm from "../components/forms/SearchForm/SearchForm";

import { searchUserProfiles, listUserProfiles } from "../utils/supabase";
import useQuery from "../utils/useQuery";

import type { NextPage } from "next";
import type { Profile } from "../types/common";
import type { PostgrestResponse } from "@supabase/supabase-js";

const Search: NextPage = () => {
	const query = useQuery();
	const { search, currentPage, perPage, totalPages, update } = query;

	const [userProfiles, setUserProfiles] = useState<Profile[]>([]);
	const { wallet } = useContext(OnboardContext);

	useEffect(() => {
		if (wallet) {
			if (search) {
				searchUserProfiles(search, currentPage, perPage).then(setupData);
			} else {
				listUserProfiles(currentPage, perPage).then(setupData);
			}
		}
	}, [wallet, search, currentPage, perPage]);

	function setupData(results: PostgrestResponse<Profile>) {
		setUserProfiles(results.data ?? []);

		if (results.count) {
			let newPageCount = Math.ceil(results.count / perPage);

			if(newPageCount !== totalPages) {
				update({
					currentPage: 1,
					totalPages: newPageCount
				})
			}
		}
	}

	return (
		<>
			<Head>
				<title>Search - Developer DAO</title>
				<meta name="description" content="Developer DAO" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Heading>Profiles</Heading>

			<SearchForm setQuery={(search) => update({search})} />

			{!!userProfiles.length && (
				<>
					<Pagination {...query} />
					<Grid gridGap={2} gridTemplateColumns="repeat(3, 1fr)" gridAutoRows="1fr">
						{userProfiles.map((profile) => {
							return <ProfilePreview key={profile.address} profile={profile} />;
						})}
					</Grid>
				</>
			)}
		</>
	);
};

export default Search;
