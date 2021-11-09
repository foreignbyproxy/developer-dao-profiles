import { createClient } from "@supabase/supabase-js";
import _ from "lodash";
import faker from "faker";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_KEY
);

const sampleAuths = [
	"0x8de4c8cddf24c166c777a0d69ccb860102e8895ccbfd1f66690c4f098e74c11d5f88428e3068cf5f7d997f6bdfffb06a44cc8a1a25872568b4a579bcbeb212b41c",
	faker.datatype.uuid(),
	faker.datatype.uuid(),
	faker.datatype.uuid(),
	faker.datatype.uuid(),
	faker.datatype.uuid(),
	faker.datatype.uuid(),
];

const profiles_bwc_values = ["Email", "Twitter", "Discord"];
const profiles_discipline_values = ["Developer", "Designer", "Other"];
const profiles_interestedIn_values = ["Jobs", "Learning", "Lurking", "Other"];

const jobs_location_mods = ["Remote", "Paid Relocation", "Visa Sponsor"];
const jobs_mods = ["Full-time", "Part-time", "Contract", "Intern", "Other Engagement"];
const job_skills = [
	"Skill 1",
	"Skill 2",
	"Skill 3",
	"Skill 4",
	"Skill 5",
	"Skill 6",
	"Skill 7",
	"Skill 8",
];

const job_category = [
	"Engineering",
	"Design / Product",
	"Trading / Crypto Research",
	"Community",
	"Content",
	"Marketing",
	"Regulatory, Legal, Compliance",
	"Leadership",
	"Sales",
	"Other",
];

const job_salary_currency = ["USD", "EUR", "JPY"];
const job_salary_interval = ["Year", "Month", "Week", "Hour"];
const job_how_to_apply = ["email", "url"];
const job_priority = ["Platinum", "Gold", "Silver", "Bronze"];

const job_status = ["draft", "approved", "published", "expired"];

//Create new profiles/jobs
// let i = 0;
// do {
// createjob();
// createProfile()
// 	i++;
// 	console.log(`Create fake job: ${i}`);
// } while (i < 50);

// Update Jobs
const { data } = await getAllJobs();
debugger;

for (let index = 0; index < data.length; index++) {
	const job = data[index];
	console.log(`Updating: ${job.id}`);
	await updateJob(job.id);
}

function createProfile() {
	let profile = {
		address: faker.finance.ethereumAddress(),
		auth: faker.datatype.uuid(),
		bestWayToContact: faker.datatype.boolean()
			? _.sampleSize(bwc_values, _.random(0, bwc_values.length))
			: null,
		bio: faker.datatype.boolean() ? faker.lorem.sentences() : null,
		country: faker.datatype.boolean() ? faker.address.country() : null,
		discipline: faker.datatype.boolean() ? _.sample(discipline_values) : null,
		discord: faker.datatype.boolean() ? faker.internet.userName() : null,
		email: faker.datatype.boolean() ? faker.internet.email() : null,
		ens: faker.datatype.boolean() ? `${faker.internet.domainWord()}.eth` : null,
		interestedIn: faker.datatype.boolean()
			? _.sampleSize(interestedIn_values, _.random(0, interestedIn_values.length))
			: null,
		name: faker.datatype.boolean() ? faker.name.findName() : null,
		twitter: faker.datatype.boolean() ? faker.internet.userName() : null,
	};

	supabase
		.from("profiles")
		.insert(profile)
		.then((data) => {
			if (data.error) {
				debugger;
			}
		})
		.catch((err) => {
			debugger;
		});
}

function createjob() {
	let job = {
		created_at: faker.datatype.boolean()
			? new Date(faker.date.recent()).toISOString()
			: new Date(faker.date.past()).toISOString(),
		job_title: faker.name.jobTitle(),
		location: faker.address.country(),
		location_mods: [_.sample(jobs_location_mods)],
		job_description: faker.lorem.paragraphs(),
		job_mods: _.sample(jobs_mods),
		job_skills: _.sampleSize(job_skills, _.random(0, job_skills.length)).join(", "),
		category: _.sample(job_category),
		...getSalaryInfo(),
		salary_mods: faker.datatype.boolean() ? ["Option to pay in Crypto"] : null,
		...get_how_to_apply(),
		website: faker.internet.url(),
		twitter: `@${faker.internet.userName()}`,
		contact_name: faker.name.findName(),
		contact_email: faker.internet.email(),
		company_name: faker.company.companyName(),
		company_info: faker.lorem.paragraph(),
		priority: _.sample(job_priority),
		auth: _.sample(sampleAuths),
	};

	supabase
		.from("jobs")
		.insert(job)
		.then((data) => {
			if (data.error) {
				debugger;
			}
		})
		.catch((err) => {
			debugger;
		});
}

function getAllJobs() {
	return supabase.from("jobs").select();
}

function updateJob(jobId) {
	let job = {
		status: _.sample(job_status),
	};

	if (job.status === "published") {
		let d = new Date();

		let randomNumber = faker.datatype.number({
			min: 1,
			max: 30,
		});

		d.setDate(d.getDate() - randomNumber);
		let published_date = d.toISOString();

		d.setDate(d.getDate() + 30);
		let expiration_date = d.toISOString();

		job.published_date = published_date;
		job.expiration_date = expiration_date;
	}

	if (job.status === "expired") {
		let d = new Date();

		let randomNumber = faker.datatype.number({
			min: 30,
			max: 60,
		});

		d.setDate(d.getDate() - randomNumber);
		let published_date = d.toISOString();

		d.setDate(d.getDate() + 30);
		let expiration_date = d.toISOString();

		job.published_date = published_date;
		job.expiration_date = expiration_date;
	}

	return supabase
		.from("jobs")
		.update(job)
		.match({
			id: jobId,
		})
		.then((data) => {
			if (data.error) {
				debugger;
			}
		})
		.catch((err) => {
			debugger;
		});
}

function get_how_to_apply() {
	let how = _.sample(job_how_to_apply);

	return {
		how_to_apply: how,
		app_link: how === "email" ? faker.internet.email() : faker.internet.url(),
	};
}

function getSalaryInfo() {
	let salary_currency = _.sample(job_salary_currency);
	let salary_interval = _.sample(job_salary_interval);

	let salary_low = faker.datatype.number({
		min: 50000,
		max: 100000,
	});

	let salary_high = faker.datatype.number({
		min: 100000,
		max: 150000,
	});

	switch (salary_interval) {
		case "Month":
			salary_low = (salary_low / 12).toFixed();
			salary_high = (salary_high / 12).toFixed();
			break;
		case "Week":
			salary_low = (salary_low / 52).toFixed();
			salary_high = (salary_high / 52).toFixed();
			break;
		case "Hour":
			salary_low = (salary_low / 8760).toFixed();
			salary_high = (salary_high / 8760).toFixed();
			break;
		default:
			break;
	}

	if (salary_currency === "JPY") {
		salary_low = salary_low * 100;
		salary_high = salary_high * 100;
	}

	return {
		salary_low,
		salary_high,
		salary_currency,
		salary_interval,
	};
}
