/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/jobs": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.jobs.id"];
          created_at?: parameters["rowFilter.jobs.created_at"];
          job_title?: parameters["rowFilter.jobs.job_title"];
          location?: parameters["rowFilter.jobs.location"];
          location_mods?: parameters["rowFilter.jobs.location_mods"];
          job_description?: parameters["rowFilter.jobs.job_description"];
          job_mods?: parameters["rowFilter.jobs.job_mods"];
          job_skills?: parameters["rowFilter.jobs.job_skills"];
          category?: parameters["rowFilter.jobs.category"];
          salary_low?: parameters["rowFilter.jobs.salary_low"];
          salary_high?: parameters["rowFilter.jobs.salary_high"];
          salary_currency?: parameters["rowFilter.jobs.salary_currency"];
          salary_interval?: parameters["rowFilter.jobs.salary_interval"];
          salary_mods?: parameters["rowFilter.jobs.salary_mods"];
          how_to_apply?: parameters["rowFilter.jobs.how_to_apply"];
          app_link?: parameters["rowFilter.jobs.app_link"];
          website?: parameters["rowFilter.jobs.website"];
          twitter?: parameters["rowFilter.jobs.twitter"];
          contact_name?: parameters["rowFilter.jobs.contact_name"];
          contact_email?: parameters["rowFilter.jobs.contact_email"];
          company_info?: parameters["rowFilter.jobs.company_info"];
          priority?: parameters["rowFilter.jobs.priority"];
          fts?: parameters["rowFilter.jobs.fts"];
          company_name?: parameters["rowFilter.jobs.company_name"];
          status?: parameters["rowFilter.jobs.status"];
          expiration_date?: parameters["rowFilter.jobs.expiration_date"];
          published_date?: parameters["rowFilter.jobs.published_date"];
          owner?: parameters["rowFilter.jobs.owner"];
          update_at?: parameters["rowFilter.jobs.update_at"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["jobs"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** jobs */
          jobs?: definitions["jobs"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.jobs.id"];
          created_at?: parameters["rowFilter.jobs.created_at"];
          job_title?: parameters["rowFilter.jobs.job_title"];
          location?: parameters["rowFilter.jobs.location"];
          location_mods?: parameters["rowFilter.jobs.location_mods"];
          job_description?: parameters["rowFilter.jobs.job_description"];
          job_mods?: parameters["rowFilter.jobs.job_mods"];
          job_skills?: parameters["rowFilter.jobs.job_skills"];
          category?: parameters["rowFilter.jobs.category"];
          salary_low?: parameters["rowFilter.jobs.salary_low"];
          salary_high?: parameters["rowFilter.jobs.salary_high"];
          salary_currency?: parameters["rowFilter.jobs.salary_currency"];
          salary_interval?: parameters["rowFilter.jobs.salary_interval"];
          salary_mods?: parameters["rowFilter.jobs.salary_mods"];
          how_to_apply?: parameters["rowFilter.jobs.how_to_apply"];
          app_link?: parameters["rowFilter.jobs.app_link"];
          website?: parameters["rowFilter.jobs.website"];
          twitter?: parameters["rowFilter.jobs.twitter"];
          contact_name?: parameters["rowFilter.jobs.contact_name"];
          contact_email?: parameters["rowFilter.jobs.contact_email"];
          company_info?: parameters["rowFilter.jobs.company_info"];
          priority?: parameters["rowFilter.jobs.priority"];
          fts?: parameters["rowFilter.jobs.fts"];
          company_name?: parameters["rowFilter.jobs.company_name"];
          status?: parameters["rowFilter.jobs.status"];
          expiration_date?: parameters["rowFilter.jobs.expiration_date"];
          published_date?: parameters["rowFilter.jobs.published_date"];
          owner?: parameters["rowFilter.jobs.owner"];
          update_at?: parameters["rowFilter.jobs.update_at"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.jobs.id"];
          created_at?: parameters["rowFilter.jobs.created_at"];
          job_title?: parameters["rowFilter.jobs.job_title"];
          location?: parameters["rowFilter.jobs.location"];
          location_mods?: parameters["rowFilter.jobs.location_mods"];
          job_description?: parameters["rowFilter.jobs.job_description"];
          job_mods?: parameters["rowFilter.jobs.job_mods"];
          job_skills?: parameters["rowFilter.jobs.job_skills"];
          category?: parameters["rowFilter.jobs.category"];
          salary_low?: parameters["rowFilter.jobs.salary_low"];
          salary_high?: parameters["rowFilter.jobs.salary_high"];
          salary_currency?: parameters["rowFilter.jobs.salary_currency"];
          salary_interval?: parameters["rowFilter.jobs.salary_interval"];
          salary_mods?: parameters["rowFilter.jobs.salary_mods"];
          how_to_apply?: parameters["rowFilter.jobs.how_to_apply"];
          app_link?: parameters["rowFilter.jobs.app_link"];
          website?: parameters["rowFilter.jobs.website"];
          twitter?: parameters["rowFilter.jobs.twitter"];
          contact_name?: parameters["rowFilter.jobs.contact_name"];
          contact_email?: parameters["rowFilter.jobs.contact_email"];
          company_info?: parameters["rowFilter.jobs.company_info"];
          priority?: parameters["rowFilter.jobs.priority"];
          fts?: parameters["rowFilter.jobs.fts"];
          company_name?: parameters["rowFilter.jobs.company_name"];
          status?: parameters["rowFilter.jobs.status"];
          expiration_date?: parameters["rowFilter.jobs.expiration_date"];
          published_date?: parameters["rowFilter.jobs.published_date"];
          owner?: parameters["rowFilter.jobs.owner"];
          update_at?: parameters["rowFilter.jobs.update_at"];
        };
        body: {
          /** jobs */
          jobs?: definitions["jobs"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.profiles.created_at"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          country?: parameters["rowFilter.profiles.country"];
          discipline?: parameters["rowFilter.profiles.discipline"];
          email?: parameters["rowFilter.profiles.email"];
          discord?: parameters["rowFilter.profiles.discord"];
          twitter?: parameters["rowFilter.profiles.twitter"];
          bestWayToContact?: parameters["rowFilter.profiles.bestWayToContact"];
          ens?: parameters["rowFilter.profiles.ens"];
          bio?: parameters["rowFilter.profiles.bio"];
          interestedIn?: parameters["rowFilter.profiles.interestedIn"];
          name?: parameters["rowFilter.profiles.name"];
          id?: parameters["rowFilter.profiles.id"];
          address?: parameters["rowFilter.profiles.address"];
          fts?: parameters["rowFilter.profiles.fts"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.profiles.created_at"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          country?: parameters["rowFilter.profiles.country"];
          discipline?: parameters["rowFilter.profiles.discipline"];
          email?: parameters["rowFilter.profiles.email"];
          discord?: parameters["rowFilter.profiles.discord"];
          twitter?: parameters["rowFilter.profiles.twitter"];
          bestWayToContact?: parameters["rowFilter.profiles.bestWayToContact"];
          ens?: parameters["rowFilter.profiles.ens"];
          bio?: parameters["rowFilter.profiles.bio"];
          interestedIn?: parameters["rowFilter.profiles.interestedIn"];
          name?: parameters["rowFilter.profiles.name"];
          id?: parameters["rowFilter.profiles.id"];
          address?: parameters["rowFilter.profiles.address"];
          fts?: parameters["rowFilter.profiles.fts"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.profiles.created_at"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          country?: parameters["rowFilter.profiles.country"];
          discipline?: parameters["rowFilter.profiles.discipline"];
          email?: parameters["rowFilter.profiles.email"];
          discord?: parameters["rowFilter.profiles.discord"];
          twitter?: parameters["rowFilter.profiles.twitter"];
          bestWayToContact?: parameters["rowFilter.profiles.bestWayToContact"];
          ens?: parameters["rowFilter.profiles.ens"];
          bio?: parameters["rowFilter.profiles.bio"];
          interestedIn?: parameters["rowFilter.profiles.interestedIn"];
          name?: parameters["rowFilter.profiles.name"];
          id?: parameters["rowFilter.profiles.id"];
          address?: parameters["rowFilter.profiles.address"];
          fts?: parameters["rowFilter.profiles.fts"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/rpc/compare_auth": {
    post: {
      parameters: {
        body: {
          args: { [key: string]: unknown };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
}

export interface definitions {
  jobs: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    created_at?: string;
    job_title: string;
    location: string;
    location_mods?: string;
    job_description: string;
    job_mods: string;
    job_skills: string;
    category: string;
    salary_low?: number;
    salary_high?: number;
    salary_currency: string;
    salary_interval: string;
    salary_mods?: string;
    how_to_apply: string;
    app_link: string;
    website?: string;
    twitter?: string;
    contact_name: string;
    contact_email: string;
    company_info?: string;
    priority: string;
    fts?: string;
    company_name?: string;
    status?: string;
    expiration_date?: string;
    published_date?: string;
    owner?: string;
    update_at?: string;
  };
  profiles: {
    created_at?: string;
    updated_at?: string;
    country?: string;
    discipline?: string;
    email?: string;
    discord?: string;
    twitter?: string;
    bestWayToContact?: string[];
    ens?: string;
    bio?: string;
    interestedIn?: string[];
    name?: string;
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    address: string;
    fts?: string;
  };
}

export interface parameters {
  /** Preference */
  preferParams: "params=single-object";
  /** Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** Preference */
  preferCount: "count=none";
  /** Filtering Columns */
  select: string;
  /** On Conflict */
  on_conflict: string;
  /** Ordering */
  order: string;
  /** Limiting and Pagination */
  range: string;
  /** Limiting and Pagination */
  rangeUnit: string;
  /** Limiting and Pagination */
  offset: string;
  /** Limiting and Pagination */
  limit: string;
  /** jobs */
  "body.jobs": definitions["jobs"];
  "rowFilter.jobs.id": string;
  "rowFilter.jobs.created_at": string;
  "rowFilter.jobs.job_title": string;
  "rowFilter.jobs.location": string;
  "rowFilter.jobs.location_mods": string;
  "rowFilter.jobs.job_description": string;
  "rowFilter.jobs.job_mods": string;
  "rowFilter.jobs.job_skills": string;
  "rowFilter.jobs.category": string;
  "rowFilter.jobs.salary_low": string;
  "rowFilter.jobs.salary_high": string;
  "rowFilter.jobs.salary_currency": string;
  "rowFilter.jobs.salary_interval": string;
  "rowFilter.jobs.salary_mods": string;
  "rowFilter.jobs.how_to_apply": string;
  "rowFilter.jobs.app_link": string;
  "rowFilter.jobs.website": string;
  "rowFilter.jobs.twitter": string;
  "rowFilter.jobs.contact_name": string;
  "rowFilter.jobs.contact_email": string;
  "rowFilter.jobs.company_info": string;
  "rowFilter.jobs.priority": string;
  "rowFilter.jobs.fts": string;
  "rowFilter.jobs.company_name": string;
  "rowFilter.jobs.status": string;
  "rowFilter.jobs.expiration_date": string;
  "rowFilter.jobs.published_date": string;
  "rowFilter.jobs.owner": string;
  "rowFilter.jobs.update_at": string;
  /** profiles */
  "body.profiles": definitions["profiles"];
  "rowFilter.profiles.created_at": string;
  "rowFilter.profiles.updated_at": string;
  "rowFilter.profiles.country": string;
  "rowFilter.profiles.discipline": string;
  "rowFilter.profiles.email": string;
  "rowFilter.profiles.discord": string;
  "rowFilter.profiles.twitter": string;
  "rowFilter.profiles.bestWayToContact": string;
  "rowFilter.profiles.ens": string;
  "rowFilter.profiles.bio": string;
  "rowFilter.profiles.interestedIn": string;
  "rowFilter.profiles.name": string;
  "rowFilter.profiles.id": string;
  "rowFilter.profiles.address": string;
  "rowFilter.profiles.fts": string;
}

export interface operations {}

export interface external {}