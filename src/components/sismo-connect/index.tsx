import React from 'react';
import {
	SismoConnectButton,
	AuthType,
	ClaimType,
} from '@sismo-core/sismo-connect-react';

import {} from '@sismo-core/sismo-connect-client';

// Config
import { env } from '~/env.mjs';

// Types
import type { SismoConnectResponse } from '@sismo-core/sismo-connect-react';

const SismoConnect = () => {
	const onResponse = (response: SismoConnectResponse) => {
		console.log(response);
		const res = fetch('/api/verify', {
			method: 'POST',
			body: JSON.stringify(response),
		})
			.then((res) => res.json())
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	return (
		<SismoConnectButton
			config={{
				appId: env.NEXT_PUBLIC_SISMO_APP_ID,
				vault: {
					// For development purposes insert the Data Sources that you want to impersonate here
					// Never use this in production
					impersonate: [
						// EVM
						'leo21.sismo.eth',
						'0xA4C94A6091545e40fc9c3E0982AEc8942E282F38',
						'0x1b9424ed517f7700e7368e34a9743295a225d889',
						'0x82fbed074f62386ed43bb816f748e8817bf46ff7',
						'0xc281bd4db5bf94f02a8525dca954db3895685700',
						// Github
						'github:leo21',
						// Twitter
						'twitter:leo21_eth',
						// Telegram
						'telegram:leo21',
					],
				},
				// displayRawResponse: true,
			}}
			// request proof of Data Sources ownership (e.g EVM, GitHub, twitter or telegram)
			auths={[{ authType: AuthType.GITHUB }]}
			// request zk proof that Data Source are part of a group
			// (e.g NFT ownership, Dao Participation, GitHub commits)
			claims={[
				// Gitcoin passport with at least a score of 15
				{
					groupId: '0x1cde61966decb8600dfd0749bd371f12',
					value: 15,
					claimType: ClaimType.GTE,
				},
			]}
			// request message signature from users.
			signature={{ message: 'I vote Yes to Privacy' }}
			// retrieve the Sismo Connect Reponse from the user's Sismo data vault
			onResponse={onResponse}
			// reponse in bytes to call a contract
			// onResponseBytes={async (response: string) => {
			//   console.log(response);
			// }}
		/>
	);
};

export default SismoConnect;
