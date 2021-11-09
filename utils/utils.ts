import { useToast } from "@chakra-ui/react";
import type { ShowToastProps } from "../types/common";

export function showToast(toast: ReturnType<typeof useToast>, { title, description, type }: ShowToastProps) {
	toast({
		title: title,
		description: description,
		status: type,
		duration: 5000,
		isClosable: true,
	});
}
