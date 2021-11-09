import { useReducer } from "react";

import type { useQueryInterface } from "../types/common";

interface reducerAction {
	type: "update";
	payload: Partial<useQueryInterface>;
}

function reducer(state: useQueryInterface, action: reducerAction) {
	switch (action.type) {
		case "update":
			return {
				...state,
				...action.payload,
			};
		default:
			throw new Error();
	}
}

function useQuery(page: number = 1, perPage: number = 21) {
	const [state, dispatch] = useReducer(reducer, {
		currentPage: page,
		perPage,
		totalPages: 1,
		search: "",
	});

	return {
		...state,
		nextPage: () => {
			let nextPage = state.currentPage + 1;
			let page = nextPage < state.totalPages ? nextPage : state.totalPages;

			dispatch({
				type: "update",
				payload: {
					currentPage: page,
				},
			});
		},
		prevPage: () => {
			let prevPage = state.currentPage - 1;
			let page = prevPage > 0 ? prevPage : 1;

			dispatch({
				type: "update",
				payload: {
					currentPage: page,
				},
			});
		},
		update: (payload: Partial<useQueryInterface>) => {
			dispatch({
				type: "update",
				payload,
			});
		},
	};
}

export default useQuery;
