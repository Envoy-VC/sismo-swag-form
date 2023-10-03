import type { NextApiRequest, NextApiResponse } from 'next';
import { SismoConnect } from '@sismo-core/sismo-connect-server';

import {
	gitcoinPassportRequest,
	twitterRequest,
} from '~/components/custom-sismo-connect';

// Types
import type { SismoConnectVerifiedResult } from '@sismo-core/sismo-connect-server';
import type { SismoConnectResponse } from '@sismo-core/sismo-connect-client';

const sismoConnect = SismoConnect({
	config: {
		appId: process.env.NEXT_PUBLIC_SISMO_APP_ID ?? '',
	},
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const sismoConnectResponse = JSON.parse(
		req.body as string
	) as SismoConnectResponse;

	console.log(sismoConnectResponse);

	if (!sismoConnectResponse) return;

	try {
		// verify the sismo connect response that corresponds to the request
		const result: SismoConnectVerifiedResult = await sismoConnect.verify(
			sismoConnectResponse,
			{
				auths: [{ ...twitterRequest }],
				claims: [{ ...gitcoinPassportRequest }],
				signature: { message: 'Swag form Verification' },
			}
		);
		res.status(200).json({ result: result, success: true });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		console.error(e);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		res.status(500).json(e?.message);
	}
}

export default handler;
