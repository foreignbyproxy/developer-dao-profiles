export const Button = {
	baseStyle: {
		fontWeight: "bold",
	},
	variants: {
		outline: {
			border: "2px solid",
			borderColor: "teal.500",
			color: "teal.500",
		},
		solid: {
			bg: "gray.700",
			color: "teal.500",
		},
		alt: {
			bg: "teal.500",
			color: "white",
		},
		soft: {
			bg: "gray.300",
			color: "gray.600",
		},
	},
	defaultProps: {
		size: "md",
		variant: "solid",
	},
};
