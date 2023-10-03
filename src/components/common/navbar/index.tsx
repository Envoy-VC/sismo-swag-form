import React from 'react';

// Icons
import { PiGiftBold } from 'react-icons/pi';

const Navbar = () => {
	return (
		<div className='p-4 px-6'>
			<div className='flex flex-row items-center justify-between'>
				<div className='flex flex-row items-center gap-2'>
					<PiGiftBold className='text-4xl text-blue-500' />
					<div className='hidden text-3xl  sm:flex'>Sismo Swag Form</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
