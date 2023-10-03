import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

import { sismoConnect } from '~/components/custom-sismo-connect';
import { Button } from 'antd';

const Home: NextPageWithLayout = () => {
	const response = sismoConnect.getResponse();

	const verifyResponse = () => {
		fetch('http://localhost:3000/api/verify', {
			method: 'POST',
			body: JSON.stringify(response),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className='mx-auto w-fit border-2'>
			<p className='max-w-xl break-all'>{JSON.stringify(response)}</p>
			{response && <Button onClick={verifyResponse}>Verify Proofs</Button>}
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
