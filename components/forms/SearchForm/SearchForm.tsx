import React from "react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import { Box, FormControl, FormErrorMessage, Input, HStack, Button } from "@chakra-ui/react";

import type { SearchFormValues } from "../../../types/common";

interface Props {
	setQuery: (query: string | string[]) => void;
}

const defaultFieldValues: SearchFormValues = {
	query: "",
};

function SearchForm({ setQuery }: Props) {
	async function handleSubmit(
		values: SearchFormValues,
		{ setSubmitting }: FormikHelpers<SearchFormValues>
	) {
		if (values.query) {
			const keywords = values.query.split(" ");
			setQuery(keywords);
		} else {
			setQuery("");
		}

		setSubmitting(false);
	}

	return (
		<Box my={8}>
			<Formik initialValues={defaultFieldValues} onSubmit={handleSubmit}>
				{({ handleSubmit, isSubmitting, isValid, setFieldValue }) => (
					<Form onSubmit={handleSubmit}>
						<HStack align="center">
							<Field name="query">
								{({ field, form }: FieldProps) => (
									<FormControl>
										<Input {...field} id="query" placeholder="Search" />
										<FormErrorMessage>{form.errors.query}</FormErrorMessage>
									</FormControl>
								)}
							</Field>

							<Button
								type="submit"
								variant={isValid ? "alt" : "outline"}
								isDisabled={isSubmitting}
							>
								Search
							</Button>
							<Button
								type="button"
								variant="soft"
								onClick={() => {
									setQuery("");
									setFieldValue("query", "");
								}}
							>
								Reset
							</Button>
						</HStack>
					</Form>
				)}
			</Formik>
		</Box>
	);
}

export default SearchForm;
