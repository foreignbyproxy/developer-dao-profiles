import type { definitions } from "./supabase";

/*
	This exists to extend and add more narrow types to the openapi-typescript types generated from Supabase
*/
type ProfileFromSupabase = definitions['profiles'];
export interface Profile extends ProfileFromSupabase {
	bestWayToContact: string[];
	interestedIn: string[];
};

export type ProfileLookupKeys = 'ens' | "discord" | "address" | "id" | "signature";

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
