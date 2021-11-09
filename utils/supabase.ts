import { createClient } from "@supabase/supabase-js";

import type { Job, Profile, ProfileFormValues, JobFormValues } from "../types/common";

const USER_PROFILE_FIELDS = [
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

const JOB_PREVIEW_FIELDS = [
    "id",
    "job_title",
    "location",
    "category",
    "company_name",
]

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

export function getUserProfile(address: string) {
	return supabase
		.from<Profile>("profiles")
		.select(USER_PROFILE_FIELDS.join(","))
		.eq("address", address)
		.single();
}

export function listUserProfiles(page: number = 1, perPage: number = 20) {
	let start = (page - 1) * perPage;
	let end = page * perPage - 1;

	return supabase
		.from<Profile>("profiles")
		.select(USER_PROFILE_FIELDS.join(","), { count: "exact" })
		.order("discord")
		.range(start, end);
}

export function searchUserProfiles(keywords: string | string[], page: number = 1, perPage: number = 21) {
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
		.select(USER_PROFILE_FIELDS.join(","), { count: "exact" })
		.textSearch("fts", query)
		.order("discord")
		.range(start, end);
}

export function updateJob(id: number | null, address: string, values: JobFormValues) {
	let data: {
		[k: string]: any
	} = {
		update_at: new Date().toISOString(),
		owner: address,
		...values,
	};

	if(id) {
		data.id = id;
	}

	return supabase.from("jobs").upsert(
		data,
		{ onConflict: "id" }
	);
}

export function getJob(id: string) {
	return supabase
		.from<Job>("jobs")
		.select('*')
		.eq('id', id)
		.single();
}

export function listJobs(page: number = 1, perPage: number = 20) {
	let start = (page - 1) * perPage;
	let end = page * perPage - 1;

	let ref_date = new Date().toISOString().split("T")[0];

	return supabase
		.from<Job>("jobs")
		.select(JOB_PREVIEW_FIELDS.join(","), { count: "exact" })
		.gt("expiration_date", ref_date)
		.order("created_at")
		.range(start, end);
}

export function listUserJobs(address: string, page: number = 1, perPage: number = 20) {
	let start = (page - 1) * perPage;
	let end = page * perPage - 1;

	return supabase
		.from<Job>("jobs")
		.select(JOB_PREVIEW_FIELDS.join(","), { count: "exact" })
		.eq('owner', address)
		.order("created_at")
		.range(start, end);
}

export function searchJobs(keywords: string | string[], page: number = 1, perPage: number = 21) {
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

	let ref_date = new Date().toISOString().split("T")[0];

	return supabase
		.from<Job>("jobs")
		.select(JOB_PREVIEW_FIELDS.join(","), { count: "exact" })
		.gt("expiration_date", ref_date)
		.textSearch("fts", query)
		.order("created_at")
		.range(start, end);
}

export function listPendingJobs(page: number = 1, perPage: number = 20) {
	let start = (page - 1) * perPage;
	let end = page * perPage - 1;

	return supabase
		.from<Job>("jobs")
		.select(JOB_PREVIEW_FIELDS.join(","), { count: "exact" })
		.eq('status', 'draft')
		.order("created_at")
		.range(start, end);
}


export default supabase;
