import React, { useReducer, useEffect } from "react";
import Onboard from "bnc-onboard";
import { useToast } from "@chakra-ui/react";

import { doesAddressOwnToken } from "../../../utils/web3";

import type { Wallet } from "bnc-onboard/dist/src/interfaces";

interface OnboardContextInterface {
	address: string | null;
	ens: any | null;
	network: any | null;
	wallet: Wallet | null;
	onboard: any | null;
	initialized: boolean;
}

interface OnboardProviderInterface {
	children: React.ReactChild;
}

const reducerInitialState: OnboardContextInterface = {
	address: null,
	ens: null,
	network: null,
	wallet: null,
	onboard: null,
	initialized: false,
};

interface reducerAction {
	type: "update";
	payload: Partial<OnboardContextInterface>;
}

function reducer(state: OnboardContextInterface, action: reducerAction) {
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

export const OnboardContext = React.createContext<OnboardContextInterface>(reducerInitialState);

export const OnboardProvider = ({ children }: OnboardProviderInterface) => {
	const [state, dispatch] = useReducer(reducer, reducerInitialState);
	const toast = useToast();

	function updateState(payload: Partial<OnboardContextInterface>) {
		dispatch({
			type: "update",
			payload,
		});
	}

	function resetState() {
		window.localStorage.removeItem("selectedWallet");

		dispatch({
			type: "update",
			payload: {
				address: null,
				ens: null,
				network: null,
				wallet: null,
				initialized: true,
			},
		});
	}

	useEffect(() => {
		const onboard = Onboard({
			dappId: process.env.NEXT_PUBLIC_ONBOARD_API,
			networkId: 1,
			subscriptions: {
				ens: (ens) => {
					updateState({ ens: ens });
				},
				network: (network) => {
					updateState({ network: network });
				},
				wallet: async (wallet) => {
					let address: string | null = null;

					//wallet comes back with its properties set to undefined if no wallet is connected
					if (wallet.name && wallet.provider && wallet.connect) {
						const results = await wallet.connect();

						if (Array.isArray(results) && results.length) {
							address = results[0];
						}

						if (address) {
							//Check if address contains a DD NFT
							const hasAccess = await doesAddressOwnToken(address);

							if (hasAccess) {
								//Store the selectedWallet so users can be signed in quickly next time
								window.localStorage.setItem("selectedWallet", wallet.name);

								//Update app state to allow users to interact with the dApp
								updateState({
									onboard,
									wallet,
									address,
									initialized: true,
								});
							} else {
								onboard.walletReset();
								toast({
									title: 'Nope',
									description: `We can't find a Developer DAO token in your wallet. The token is the only way...`,
									status: 'error',
									duration: 5000,
									isClosable: true,
								});
							}
						}
					} else {
						resetState();
					}
				},
			},
			walletSelect: {
				wallets: [
					{ walletName: "coinbase", preferred: true },
					{ walletName: "metamask", preferred: true },
					{
						walletName: "ledger",
						rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
					},
					{
						walletName: "walletConnect",
						infuraKey: process.env.NEXT_PUBLIC_INFURA_KEY,
					},
					{ walletName: "gnosis" },
				],
			},
			walletCheck: [
				{ checkName: "connect" },
				{ checkName: "accounts" },
				{ checkName: "network" },
				{ checkName: "balance", minimumBalance: "100000" },
			],
		});

		// call wallet select with that value if it exists
		const previouslySelectedWallet = window.localStorage.getItem("selectedWallet");
		if (previouslySelectedWallet) {
			onboard.walletSelect(previouslySelectedWallet);
		} else {
			updateState({
				onboard,
				initialized: true,
			});
		}
	}, []);

	return (
		<OnboardContext.Provider value={state}>
			{state.initialized && children}
		</OnboardContext.Provider>
	);
};
