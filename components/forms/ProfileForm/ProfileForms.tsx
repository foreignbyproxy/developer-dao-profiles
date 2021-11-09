import React, { FunctionComponent, useContext } from "react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import {
	Box,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Select,
	Textarea,
	Checkbox,
	CheckboxGroup,
	HStack,
	Button,
	ButtonGroup,
	useToast,
} from "@chakra-ui/react";

import { updateUserProfile } from "../../../utils/supabase";
import useSignMessageModal from "../../../utils/useSignMessageModal";
import { OnboardContext } from "../../context/OnboardContext/OnboardContext";

import type { Profile, ProfileFormValues } from "../../../types/common";

interface Props {
	address: string;
	userProfile: Profile | null;
}

interface ShowToastProps {
	title: string;
	description: string;
	type: "error" | "success";
}

const defaultFieldValues: ProfileFormValues = {
	bestWayToContact: [],
	bio: "",
	country: "",
	discipline: "",
	discord: "",
	email: "",
	ens: "",
	interestedIn: [],
	name: "",
	twitter: "",
};

function ProfileForm({ address, userProfile }: Props) {
	const { askForSignature, SigningModal } = useSignMessageModal();
	const { wallet } = useContext(OnboardContext);
	const toast = useToast();

	function showToast({ title, description, type }: ShowToastProps) {
		toast({
			title: title,
			description: description,
			status: type,
			duration: 5000,
			isClosable: true,
		});
	}

	async function handleSubmit(
		values: ProfileFormValues,
		{ setSubmitting }: FormikHelpers<ProfileFormValues>
	) {
		//`address` is a supposed to be unique and is necessary part for the user profile
		if (!address || !wallet) {
			showToast({
				title: "Nope",
				description: "No wallet detected. Reload the application and connect your wallet.",
				type: "error",
			});

			return setSubmitting(false);
		}

		//Get user signature to prove they are who they say they are
		let signature = await askForSignature(wallet, address).catch((error) => {
			showToast({
				title: "Nope",
				description: "We need you to sign this message to save your profile.",
				type: "error",
			});

			return setSubmitting(false);
		});

		if (signature) {
			window.localStorage.setItem("signature", signature);

			const { error } = await updateUserProfile(address, values);

			//Display error message
			if (error) {
				showToast({
					title: "Nope",
					description: error.message,
					type: "error",
				});
			} else {
				showToast({
					title: "Horay!!",
					description: `Successfully ${
						userProfile ? "updated" : "created"
					} user profile.`,
					type: "success",
				});
			}
		}

		setSubmitting(false);
	}

	const initialFormValues = userProfile
		? {
				bestWayToContact: userProfile.bestWayToContact ?? [],
				bio: userProfile.bio ?? "",
				country: userProfile.country ?? "",
				discipline: userProfile.discipline ?? "",
				discord: userProfile.discord ?? "",
				email: userProfile.email ?? "",
				ens: userProfile.ens ?? "",
				interestedIn: userProfile.interestedIn ?? [],
				name: userProfile.name ?? "",
				twitter: userProfile.twitter ?? "",
		  }
		: defaultFieldValues;

	return (
		<Box maxW="640px">
			<Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
				{({ handleSubmit, isSubmitting, isValid }) => (
					<Form onSubmit={handleSubmit}>
						<Field name="name">
							{({ field, form }: FieldProps) => (
								<FormControl mb={4}>
									<FormLabel htmlFor="name">Name</FormLabel>
									<Input {...field} id="name" placeholder="Name" />
									<FormErrorMessage>{form.errors.name}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Field name="country">
							{({ field, form }: FieldProps) => {
								return (
									<FormControl mb={4}>
										<FormLabel htmlFor="country">Country</FormLabel>
										<Select
											{...field}
											id="country"
											placeholder="Select country"
										>
											<option>USA</option>
											<option>France</option>
											<option>Germany</option>
											<option>Spain</option>
											<option>South Africa</option>
											<option>China</option>
											<option>Nigeria</option>
										</Select>
										<FormErrorMessage>{form.errors.country}</FormErrorMessage>
									</FormControl>
								);
							}}
						</Field>

						<Field name="discipline">
							{({ field, form }: FieldProps) => (
								<FormControl mb={4}>
									<FormLabel htmlFor="discipline">Discipline</FormLabel>
									<Select
										{...field}
										id="discipline"
										placeholder="Select Discipline"
									>
										<option>Developer</option>
										<option>Designer</option>
										<option>Other</option>
									</Select>
									<FormErrorMessage>{form.errors.discipline}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Field name="email">
							{({ field, form }: FieldProps) => (
								<FormControl mb={4}>
									<FormLabel htmlFor="email">E-mail</FormLabel>
									<Input
										{...field}
										id="email"
										type="email"
										placeholder="E-mail"
									/>
									<FormErrorMessage>{form.errors.email}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Field name="discord">
							{({ field, form }: FieldProps) => (
								<FormControl mb={4}>
									<FormLabel htmlFor="discord">Discord</FormLabel>
									<Input {...field} id="discord" placeholder="Discord" />
									<FormErrorMessage>{form.errors.discord}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Field name="twitter">
							{({ field, form }: FieldProps) => (
								<FormControl mb={4}>
									<FormLabel htmlFor="twitter">Twitter</FormLabel>
									<Input {...field} id="twitter" placeholder="Twitter" />
									<FormErrorMessage>{form.errors.twitter}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Field name="bestWayToContact">
							{({ field, form }: FieldProps) => {
								return (
									<FormControl mb={4}>
										<FormLabel htmlFor="twitter">
											Preferred Contact Method
										</FormLabel>
										<CheckboxGroup value={field.value}>
											<HStack>
												<Checkbox
													name="bestWayToContact"
													value="Email"
													onChange={field.onChange}
												>
													Email
												</Checkbox>
												<Checkbox
													name="bestWayToContact"
													value="Twitter"
													onChange={field.onChange}
												>
													Twitter
												</Checkbox>
												<Checkbox
													name="bestWayToContact"
													value="Discord"
													onChange={field.onChange}
												>
													Discord
												</Checkbox>
											</HStack>
										</CheckboxGroup>
									</FormControl>
								);
							}}
						</Field>

						<Field name="ens">
							{({ field, form }: FieldProps) => (
								<FormControl mb={4}>
									<FormLabel htmlFor="ens">ENS</FormLabel>
									<Input {...field} id="ens" placeholder="ENS" />
									<FormErrorMessage>{form.errors.ens}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Field name="bio">
							{({ field, form }: FieldProps) => (
								<FormControl mb={4}>
									<FormLabel htmlFor="bio">Short Biography</FormLabel>
									<Textarea {...field} id="bio" placeholder="Short Bio" />
									<FormErrorMessage>{form.errors.bio}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Field name="interestedIn">
							{({ field, form }: FieldProps) => (
								<FormControl mb={4}>
									<FormLabel htmlFor="interestedIn">I'm interested in:</FormLabel>
									<CheckboxGroup value={field.value}>
										<HStack>
											<Checkbox
												name="interestedIn"
												value="Jobs"
												onChange={field.onChange}
											>
												Jobs
											</Checkbox>
											<Checkbox
												name="interestedIn"
												value="Contract Work"
												onChange={field.onChange}
											>
												Contract Work
											</Checkbox>
											<Checkbox
												name="interestedIn"
												value="Just Lurkin'"
												onChange={field.onChange}
											>
												Just Lurkin'
											</Checkbox>
										</HStack>
									</CheckboxGroup>
								</FormControl>
							)}
						</Field>

						<ButtonGroup>
							<Button
								type="submit"
								colorScheme="teal"
								variant={isValid ? "solid" : "outline"}
								isDisabled={isSubmitting}
							>
								Submit
							</Button>
						</ButtonGroup>
					</Form>
				)}
			</Formik>
			<SigningModal />
		</Box>
	);
}

export default ProfileForm;
