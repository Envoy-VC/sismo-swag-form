import React from 'react';
import { useTheme } from 'next-themes';
import ThemeSwitcher from '../theme-switcher';
import { SismoConnect, CustomSismoConnectButton } from '~/components';

// Icons
import { PiGiftBold } from 'react-icons/pi';

const Navbar = () => {
	const { theme } = useTheme();
	return (
		<div className='p-4 px-6'>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row items-center gap-2'>
					<PiGiftBold className='text-4xl text-blue-500' />
					<div className='hidden text-2xl font-bold sm:flex'>Sismo Swag Form</div>
				</div>
				<div className='flex flex-row items-center gap-2'>
					<ThemeSwitcher />
					<CustomSismoConnectButton />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
