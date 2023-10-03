import {
	AuthType,
	ClaimType,
	SismoConnect,
} from '@sismo-core/sismo-connect-client';
import clsx from 'clsx';

// Types
import type {
	AuthRequest,
	ClaimRequest,
	SismoConnectConfig,
} from '@sismo-core/sismo-connect-client';

import { env } from '~/env.mjs';

export const sismoConfig: SismoConnectConfig = {
	appId: env.NEXT_PUBLIC_SISMO_APP_ID,
};

export const sismoConnect = SismoConnect({
	config: sismoConfig,
});

// Twitter Account Ownership
export const twitterRequest: AuthRequest = {
	authType: AuthType.TWITTER,
};

// GitCoin Passport Threshold (15)
export const gitcoinPassportRequest: ClaimRequest = {
	groupId: '0x1cde61966decb8600dfd0749bd371f12',
	value: 15,
	claimType: ClaimType.GTE,
	isOptional: true,
};

// Button

import { Button } from 'antd';

export const CustomSismoConnectButton = () => {
	return (
		<Button
			size='large'
			type='primary'
			className={clsx(
				'flex items-center justify-center bg-[#1677ff] !py-6 !text-2xl'
			)}
			onClick={() => {
				sismoConnect.request({
					auth: twitterRequest,
					claims: [gitcoinPassportRequest],
					signature: { message: 'Swag form Verification' },
				});
			}}
		>
			Verify with Sismo
		</Button>
	);
};
