import type { definitions } from "./supabase";

/*
	This exists to extend and add more narrow types to the openapi-typescript types generated from Supabase
*/
type ProfileFromSupabase = definitions['profiles'];
export interface Profile extends ProfileFromSupabase {
	bestWayToContact: string[];
	interestedIn: string[];
};

export interface ProfileFormValues {
	bestWayToContact: string[];
	bio: string;
	country: string;
	discipline: string;
	discord: string;
	email: string;
	ens: string;
	interestedIn: string[];
	name: string;
	twitter: string;
}

export interface SearchFormValues {
	query: string;
}

export interface PageTypes {
	containerWidth: string;
	containerHeight: string;
	isPrivate: boolean;
}

export interface useQueryInterface {
	currentPage: number;
	perPage: number;
	totalPages: number;
	search: string | string[];
}

export interface ShowToastProps {
	title: string;
	description: string;
	type: "error" | "success";
}

export interface ShowToastProps {
	title: string;
	description: string;
	type: "error" | "success";
}

type jobLocationMods = "Remote" | "Paid Relocation" | "Visa Sponsor";
type jobMods = "Full-time" | "Part-time" | "Contract" | "Internship" | "Other Engagement";
type jobPriority = "Platinum" | "Gold" | "Silver" | "Bronze";
type jobSalaryInterval = "Year" | "Month" | "Week" | "Hour";
type jobStatus = "draft" | "pending" | "approved" | "denied" | "published" | "expired";

/*
	This exists to extend and add more narrow types to the openapi-typescript types generated from Supabase
	- Omitting location_mods to appease the ts gods
*/
type JobFromSupabase = definitions['jobs'];
export interface Job extends Omit<JobFromSupabase, 'location_mods'> {
	location_mods: jobLocationMods[];
	job_mods: jobMods;
	salary_interval: jobSalaryInterval;
	priority: jobPriority;
	status: jobStatus;
};

export interface JobFormValues {
	job_title: string;
	location: string;
	location_mods: jobLocationMods[];
	job_description: string;
	job_mods: jobMods;
	job_skills: string;
	category: string;
	salary_low: number | "";
	salary_high: number | "";
	salary_currency: string;
	salary_interval: jobSalaryInterval;
	salary_mods: string;
	how_to_apply: string;

	app_link: string;
	website: string;
	twitter: string;
	contact_name: string;
	contact_email: string;
	company_name: string;
	company_info: string;

	priority: jobPriority;
}
