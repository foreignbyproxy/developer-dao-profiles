import { createClient } from "@supabase/supabase-js";

import type { Profile, ProfileFormValues, ProfileLookupKeys } from "../types/common";

const USER_PREVIEW_FIELDS = [
	"id",
	"discord",
	"ens",
	"interestedIn",
	"name",
	"twitter",
	"updated_at",
];

const USER_PROFILE_FIELDS = [
	"id",
	"address",
	"bestWayToContact",
	"bio",
	"country",
	"discipline",
	"discord",
	"email",
	"ens",
	"interestedIn",
	"name",
	"twitter",
	"updated_at",
];

// Create a single supabase client for interacting with your database
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL as string,
	process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);

export function updateUserProfile(address: string, values: ProfileFormValues) {
	return supabase.from("profiles").upsert(
		{
			address,
			...values,
		},
		{ onConflict: "address" }
	);
}

export function getUserProfileBykey(key: ProfileLookupKeys, value: string) {
	return supabase
		.from<Profile>("profiles")
		.select(USER_PROFILE_FIELDS.join(","))
		.eq(key, value)
		.single();
}

export function listUserProfiles(page: number = 1, perPage: number = 20) {
	let start = (page - 1) * perPage;
	let end = page * perPage - 1;

	return supabase
		.from<Profile>("profiles")
		.select(USER_PREVIEW_FIELDS.join(","), { count: "exact" })
		.order("discord")
		.range(start, end);
}

export function searchUserProfiles(
	keywords: string | string[],
	page: number = 1,
	perPage: number = 21
) {
	let start = (page - 1) * perPage;
	let end = page * perPage - 1;

	let query: string = "";
	if (Array.isArray(keywords)) {
		query = keywords
			.map((k) => {
				return `'${k}'`;
			})
			.join(" | ");
	} else if (typeof keywords === "string") {
		query = keywords;
	}

	return supabase
		.from<Profile>("profiles")
		.select(USER_PREVIEW_FIELDS.join(","), { count: "exact" })
		.textSearch("fts", query)
		.order("discord")
		.range(start, end);
}

export default supabase;
