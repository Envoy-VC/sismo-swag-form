import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

import clsx from 'clsx';

import {
	CustomSismoConnectButton,
	sismoConnect,
} from '~/components/custom-sismo-connect';
import { SwagForm } from '~/components';
import { Button } from 'antd';

const Home: NextPageWithLayout = () => {
	const response = sismoConnect.getResponse();
	const [proofsVerified, setProofsVerified] = React.useState<boolean>(true);

	const verifyResponse = () => {
		fetch(`/api/verify`, {
			method: 'POST',
			body: JSON.stringify(response),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				setProofsVerified(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className='mx-auto my-16 max-h-screen max-w-screen-xl'>
			<h1 className='text-center text-[3.5rem] font-medium leading-[1.05] sm:text-[6rem]'>
				<span className='bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500 bg-clip-text text-transparent'>
					Sismo Swag Forms
				</span>
				<br />
				Redefining Identity Verification
			</h1>
			<div className='mx-auto my-12 flex w-full flex-col items-center justify-center p-4'>
				{!response && <CustomSismoConnectButton />}
				{response && !proofsVerified && (
					<Button
						size='large'
						type='primary'
						className={clsx(
							'flex items-center justify-center bg-[#1677ff] !py-6 !text-2xl'
						)}
						onClick={verifyResponse}
					>
						Verify Proofs
					</Button>
				)}

				{response && proofsVerified && <SwagForm />}
			</div>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
