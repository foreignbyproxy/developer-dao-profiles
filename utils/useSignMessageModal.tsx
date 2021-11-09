import React, { useState } from "react";
import { ethers } from "ethers";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Text,
	Checkbox,
} from "@chakra-ui/react";

import type { Wallet } from "bnc-onboard/dist/src/interfaces";

function useSignMessageModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [saveSignature, setSaveSignature] = useState(true);

	function SigningModal() {
		return (
			<>
				<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Modal Title</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Text>
								Asking for use to sign message to authenticate their request
							</Text>
							<Checkbox
								onChange={(e) => setSaveSignature(e.target.checked)}
								defaultIsChecked
							>
								Save signature for later user
							</Checkbox>
						</ModalBody>
					</ModalContent>
				</Modal>
			</>
		);
	}

	return {
		askForSignature: async (wallet: Wallet, message: string) => {
			//Check if we already have a signature in local storage and return it if we do
			const maybeGetSignature = window.localStorage.getItem("signature");
			if (maybeGetSignature) {
				return maybeGetSignature;
			}

			//Open the modal
			setIsOpen(true);

			//Get signer and ask to sign the message
			const provider = new ethers.providers.Web3Provider(wallet.provider);
			const signer = provider.getSigner();

			return signer.signMessage(message).then((signature) => {
				debugger;

				//If the saveSignature checkbox is check then save the signature
				if(saveSignature) {
					window.localStorage.setItem("signature", signature);
				}

				return signature;
			}).finally(() => setIsOpen(false)); //Close the modal
		},
		SigningModal
	};
}

export default useSignMessageModal;
