import { ethers, getDefaultProvider, BigNumber } from "ethers";
import ddContractABI from "./dd-contract-abi.json";
import type { Wallet } from 'bnc-onboard/dist/src/interfaces'

export const DD_CONTRACT_ADDRESS = "0x25ed58c027921E14D86380eA2646E3a1B5C55A8b";

export function formatShortAddress(address: string) {
	return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
}

export function getDDContract() {
	const provider = getDefaultProvider();
	const contract = new ethers.Contract(DD_CONTRACT_ADDRESS, ddContractABI, provider);

	return contract;
}

export async function doesAddressOwnToken(address: string) {
	const contract = getDDContract();

	try {

		const results = await contract.tokenOfOwnerByIndex(address, 0);

		let value: string | null = null;
		if (results instanceof BigNumber) {
			value = results.toString();
		}

		return value ? true : false;

	} catch (error) {
		return false;
	}
}

export function signMessage(wallet: Wallet, message: string) {
	const provider = new ethers.providers.Web3Provider( wallet.provider );
	const signer = provider.getSigner();
	return signer.signMessage(message);
}
