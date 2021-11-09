import React from "react";
import { Flex, Button } from "@chakra-ui/react";

import type { useQueryInterface } from "../../../types/common";

interface Props {
	currentPage: number;
	perPage: number;
	totalPages: number | null;
	nextPage: () => void;
	prevPage: () => void;
	update: (data: Partial<useQueryInterface>) => void;
}

function Pagination({
	currentPage,
	perPage,
	totalPages,
	nextPage,
	prevPage,
	update,
}: Props) {
	if (!currentPage || !perPage || !totalPages || totalPages < 2) {
		return null;
	}

	let pages = Array.from(Array(totalPages), (_, x) => x + 1);

	return (
		<Flex gridGap={2} my={8} justify="flex-end">
			<Button type="button" variant="solid" onClick={prevPage}>
				Prev
			</Button>

			{pages.map((pageNum) => {
				return (
					<Button
						key={`page-${pageNum}`}
						type="button"
						variant={pageNum === currentPage ? "alt" : "outline"}
						onClick={() =>
							update({
								currentPage: pageNum,
							})
						}
					>
						{pageNum}
					</Button>
				);
			})}

			<Button type="button" variant="solid" onClick={nextPage}>
				Next
			</Button>
		</Flex>
	);
}

export default Pagination;
